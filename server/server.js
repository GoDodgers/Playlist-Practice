var express = require('express');
var request = require('request');
var bodyParse = require('body-parser');
var cors = require('cors');
var samplePlaylist = require('../playlist template');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playlist');

var app = express();

app.use(cors());
app.use(bodyParse.json());

var PlaylistSchema = new mongoose.Schema({
	name: String,
	description: String,
	limit: { type: Number, default: 25 },
	expiration: { type: Number, default: 604800 },
	songs: [{
		title: String,
		songURL: String,
		upVotes: Number,
		downVotes: Number
	}]
}, { collection: 'PlaylistCollection' });

var playlist = mongoose.model('playlist', PlaylistSchema);
/*var playlist1 = new playlist(samplePlaylist.playlist);
playlist1.save();

var playlist2 = new playlist(samplePlaylist.playlist2);
playlist2.save();*/

app.post("/db/playlists/create", function(req, res, next) {
	console.log("PL create req body", req.body);
	console.log("PL create req query", req.query);
	var newPlaylist = new playlist(req.query);
	newPlaylist.save(function (error, post) {
		if (error) {
			return next(error);
		}
		res.json(201, post);
	})
});

app.get("/db/playlists/getAll", function(req, res) {
	playlist.find(function(error, data) {
		if (error) {
			res.send(error);
		}
		res.json(200, data);
	});
});

app.get("/db/playlists/:id", function(req, res) {
	playlist.findById(req.params.id, function(error, data) {
		if (error) {
			res.send(error);
		}
		res.json(200, data);
	});
});


/*
playlist.findById("57c1ca92c014f1c8219acc8a", function(error, data) {
	if (error) {
		console.error(error);
	}
	//we can modify here
	data.name = "Tupac"
	data.save();
	console.log(data);
});*/

//adds a new song in songs array
app.post("/db/playlists/:id/song/add", function(req, res, next) {
	playlist.update({ _id: req.params.id }, { $push: { songs: req.body }}, 
		function(error, numAffected) {
		if (error) {
			res.send(error);
		} else {
			res.json(201, numAffected);	
		}
	});
});

//removes a song from playlist, needs playlist ID && song ID in query params
app.post("/db/playlists/song/remove", function(req, res) {
	playlist.update({ _id: req.body.listID }, { $pull:{ "songs": { _id: req.body.songID }}}, 
		function(error, numAffected) {
			if (error) {
				res.send(error);
			}
			res.json(201, numAffected);
		});
});

//deletes a playlist based on playlist id and sends back remaining playlist
app.delete("/db/playlists/:id", function(req, res) {
	playlist.remove({ _id: req.params.id }, function(error, count) {
		if (error) {
			res.send(error);
		}
		playlist.find(function(error, data) {
			if (error) {
				res.send(error);
			}
			res.json(data);
		});
	});
});

app.use(express.static("./client"));
app.set('port', process.env.PORT || 2222);

app.listen(app.get('port'), function() {
	console.log("listing on port " + app.get('port'));
	//console.log(samplePlaylist.playlist);
});

