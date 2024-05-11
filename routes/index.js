const router = require("express").Router();

router
  .use("/api-docs", require("./swagger"))
  .use("/user", require("./user"))
  .use("/song", require("./song"))
  .get("/", (req, res) => {
    res.send(
      "Welcome to the contacts API. You can try the API out at /api-docs.",
    );
    // #swagger.ignore = true
  });

module.exports = router;
