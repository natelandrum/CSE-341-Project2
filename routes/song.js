const router = require("express").Router();

const controller = require("../controllers/song");
const validation = require("../validation/song");

router.get(
  "/",
  controller.getAllSongs,
  // #swagger.description = "Get all songs"
);

router.get(
  "/:id",
  controller.getUser,
  // #swagger.description = "Get a song by ID"
);

router.post(
  "/",
  validation.saveSong,
  controller.createSong,
  // #swagger.description = "Create a new song"
  // #swagger.responses[500] = { description: "Failed to Create Song" }
);

router.put(
  "/:id",
  validation.saveSong,
  controller.updateSong,
  // #swagger.description = "Update a song by ID"
  // #swagger.responses[500] = { description: "Failed to Update Song" }
);

router.delete(
  "/:id",
  controller.deleteSong,
  // #swagger.description = "Delete a song by ID"
  // #swagger.responses[500] = { description: "Failed to Delete Song" }
);

module.exports = router;
