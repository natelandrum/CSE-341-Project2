const router = require("express").Router();

const controller = require("../controllers/user");
const validation = require("../validation/user");

router.get(
  "/",
  controller.getAllUsers,
  // #swagger.description = "Get all users"
);

router.get(
  "/:id",
  controller.getUser,
  // #swagger.description = "Get a user by ID"
);

router.post(
  "/",
  validation.saveUser,
  controller.createUser,
  // #swagger.description = "Create a new user"
  // #swagger.responses[500] = { description: "Failed to Create User" }
);

router.put(
  "/:id",
  validation.saveUser,
  controller.updateUser,
  // #swagger.description = "Update a user by ID"
  // #swagger.responses[500] = { description: "Failed to Update User" }
);

router.delete(
  "/:id",
  controller.deleteUser,
  // #swagger.description = "Delete a user by ID"
  // #swagger.responses[500] = { description: "Failed to Delete User" }
);

module.exports = router;
