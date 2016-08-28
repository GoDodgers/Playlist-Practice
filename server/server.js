var express = require('express');
var request = require('request');
var bodyParse = require('body-parser');
var cors = require('cors');
var samplePlaylist = require('../playlist template');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playlist');

var app = express();

app.use(cors());
app.use(bodyParse.json({ extended: false }));

var PlaylistSchema = new mongoose.Schema({
	name: String,
	discription: String,
	limit: Number,
	expiration: { type: Number, default: 604800 },
	upVotes: Number,
	downVotes: Number,
	songs: [{
		artist: String,
		songURL: String,
		album: String,
		albumURL: String,
		upVotes: Number,
		downVotes: Number
	}]

}, { collection: 'PlaylistCollection' });

var playlist = mongoose.model('playlist', PlaylistSchema);
/*var playlist1 = new playlist(samplePlaylist.playlist);
playlist1.save();

var playlist2 = new playlist(samplePlaylist.playlist2);
playlist2.save();*/

app.post("/api/addplaylist", function(req, res, next) {
	var newPlaylist = new playlist(req.query);
	newPlaylist.save(function (error, post) {
		if (error) {
			return next(error)
		}
		res.json(201, post)
	})
});

app.post("/api/addsong", function(req, res, next) {
	console.log('-=-=-=-=-=-=-=-=->', req.query);
	playlist.findById(req.query._id, function(error, data) {
		if (error) {
			res.send(error);
		}
		console.log("+_+_+_+_+_+_+>>>>", data)
		data.songs.push(req.query.song);
		data.save();
		res.end();
	});
});

/*
playlist.findById("57c1ca92c014f1c8219acc8a",function(error, data) {
	if (error) {
		console.error(error);
	}
	//we can modify here
	data.name = "Tupac"
	data.save();
	console.log(data);
});*/

app.get("/api/playlist", function(req, res) {
	playlist.find(function(error, data) {
		if (error) {
			res.send(error);
		}
		res.json(data);
	});
});

app.get("/api/playlist/:id", function(req, res) {
	playlist.findById(req.params.id, function(error, data) {
		if (error) {
			res.send(error);
		}
		res.json(data);
	});
});

app.delete("/api/playlist/:id", function(req, res) {
	playlist.remove({_id: req.params.id}, function (error, count) {
		if (error) {
			res.send(error);
		}
		console.log(count);
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

