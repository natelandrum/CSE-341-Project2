const router = require("express").Router();

const controller = require("../controllers/song");
const validation = require("../validation/song");
const { isAuthenticated } = require("../utils/authenticate");

router.get(
  "/",
  controller.getAllSongs,
  // #swagger.description = "Get all songs"
);

router.get(
  "/:id",
  controller.getSong,
  // #swagger.description = "Get a song by ID"
  // #swagger.parameters['id'] = { description: 'Song ID' }

);

router.post(
  "/",
  isAuthenticated,
  validation.saveSong,
  controller.createSong,
  // #swagger.description = "Create a new song"
  // #swagger.responses[500] = { description: "Failed to Create Song" }
);

router.put(
  "/:id",
  isAuthenticated,
  validation.saveSong,
  controller.updateSong,
  // #swagger.description = "Update a song by ID"
  // #swagger.responses[500] = { description: "Failed to Update Song" }
  // #swagger.parameters['id'] = { description: 'Song ID' }
);

router.delete(
  "/:id",
  isAuthenticated,
  controller.deleteSong,
  // #swagger.description = "Delete a song by ID"
  // #swagger.responses[500] = { description: "Failed to Delete Song" }
  // #swagger.parameters['id'] = { description: 'Song ID' }
);

module.exports = router;
