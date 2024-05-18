const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res) => {
  const result = await mongodb.getDb().db().collection("user").find();
  result.toArray(err => {
    if (err) {
      res.status(400).json({ message: err });
    }
  }).then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Must have a valid user id to find a user." });
  }
  const userId = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("user")
    .find({ _id: userId });
  result.toArray(err => {
    if (err) {
      res.status(400).json({ message: err });
    }
  }).then((users) => {
    if (users.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

const createUser = async (req, res) => {
  const user = {
    name: req.body.name,
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection("user")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || { message: "Failed to create user" });
  }
};

const updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Must have a valid user id to update a user." });
  }
  const userId = ObjectId.createFromHexString(req.params.id);
  const user = {
    name: req.body.name,
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection("user")
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: "Failed to update user" });
  }
};

const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Must have a valid user id to delete a user." });
  }
  const userId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("user")
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
