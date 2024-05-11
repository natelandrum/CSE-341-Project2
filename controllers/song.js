const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllSongs = async (req, res) => {
  const result = await mongodb.getDb().db().collection("song").find();
  result.toArray(err => {
    if (err) {
      res.status(400).json({ message: err });
    }
  }).then((songs) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(songs);
  });
};

const getSong = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Must have a valid song id to find a song." });
  }
  const userId = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("song")
    .find({ _id: userId });
  result.toArray(err => {
    if (err) {
      res.status(400).json({ message: err });
    }
  }).then((songs) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(songs[0]);
  });
};

const createSong = async (req, res) => {
  const song = {
    name: req.body.name,
    artist: req.body.artist,
    album: req.body.album,
    genre: req.body.genre,
    duration: req.body.duration,
    featured: req.body.featured,
    songwriters: req.body.songwriters,
    composers: req.body.composers,
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection("song")
    .insertOne(song);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || { message: "Failed to create song" });
  }
};

const updateSong = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Must have a valid song id to update a song." });
  }
  const userId = ObjectId.createFromHexString(req.params.id);
  const song = {
    name: req.body.name,
    artist: req.body.artist,
    album: req.body.album,
    genre: req.body.genre,
    duration: req.body.duration,
    featured: req.body.featured,
    songwriters: req.body.songwriters,
    composers: req.body.composers,
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection("song")
    .replaceOne({ _id: userId }, song);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: "Failed to update song" });
  }
};

const deleteSong = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Must have a valid song id to delete a song." });
  }
  const userId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("song")
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: "Failed to delete song" });
  }
};

module.exports = {
  getAllSongs,
  getSong,
  createSong,
  updateSong,
  deleteSong,
};
