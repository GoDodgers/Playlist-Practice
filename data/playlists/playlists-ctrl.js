var playlist = require('./playlists-model');

module.exports = {

	//creates new playlist from playlist model
	app.post("/db/playlists/create", function(req, res) {
		var newPlaylist = new playlist(req.query);
		newPlaylist.save(function (error, post) {
			if (error) {
				res.send(error);
			} else {
				res.status(201).json(post);
			}
		})
	});

	//gets all playlists
	app.get("/db/playlists/getAll", function(req, res) {
		playlist.find(function(error, data) {
			if (error) {
				res.send(error);
			} else {
				res.status(200).json(data);
			}
		});
	});

	//gets specific playlist based on id
	app.get("/db/playlists/:id", function(req, res) {
		playlist.findById(req.params.id, function(error, data) {
			if (error) {
				res.send(error);
			} else {
				res.status(200).json(data);
			}
		});
	});

	//adds song to playlist
	app.post("/db/playlists/:id/song/add", function(req, res, next) {
		playlist.update({ _id: req.params.id }, { $push: { songs: req.body }}, 
			function(error, numAffected) {
				if (error) {
					res.send(error);
				} else {
					res.status(201).json(numAffected);
				}
			});
	});

	//removes songs from playlists, needs listID && songID
	app.post("/db/playlists/song/remove", function(req, res) {
		playlist.update({ _id: req.body.listID }, { $pull:{ "songs": { _id: req.body.songID }}}, 
			function(error, numAffected) {
				if (error) {
					res.send(error);
				} else {
					res.status(201).json(numAffected);
				}
			});
	});
	

/*------------------------------------------------------------------------*/


	//creates new playlist from playlist model
	NAME: function(req, res) {
		var newPlaylist = new playlist(req.query);
		newPlaylist.save(function (error, post) {
			if (error) {
				res.send(error);
			} else {
				res.status(201).json(post);
			}
		})
	},

	//gets all playlists
	NAME: function(req, res) {
		playlist.find(function(error, data) {
			if (error) {
				res.send(error);
			} else {
				res.status(200).json(data);
			}
		});
	},

	//gets specific playlist based on id
	NAME: function(req, res) {
		playlist.findById(req.params.id, function(error, data) {
			if (error) {
				res.send(error);
			} else {
				res.status(200).json(data);
			}
		});
	},

	//adds song to playlist
	NAME: function(req, res, next) {
		playlist.update({ _id: req.params.id }, { $push: { songs: req.body }}, 
			function(error, numAffected) {
				if (error) {
					res.send(error);
				} else {
					res.status(201).json(numAffected);
				}
			});
	},

	//removes songs from playlists, needs listID && songID
	NAME: function(req, res) {
		playlist.update({ _id: req.body.listID }, { $pull:{ "songs": { _id: req.body.songID }}}, 
			function(error, numAffected) {
				if (error) {
					res.send(error);
				} else {
					res.status(201).json(numAffected);
				}
			});
	}
	
}
