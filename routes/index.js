const router = require("express").Router();
const passport = require("passport");

router
  .use("/api-docs", require("./swagger"))
  .use("/user", require("./user"))
  .use("/song", require("./song"))
  .get("/login", passport.authenticate("github"), (req, res) => {}
  // #swagger.ignore = true
)
  .get("/logout", (req, res, next) => {
  req.logout(err => {
    if(err) {
      return next(err);
    } 
    res.redirect("/");
  });
  // #swagger.ignore = true
})


module.exports = router;
