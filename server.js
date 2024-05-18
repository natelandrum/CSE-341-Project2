/* eslint-disable no-undef */
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json())
.use(session({
   secret: "secret",
   ressave: false,
    saveUninitialized: true,
  },))
.use(passport.initialize())
.use(passport.session())
.use("/", require("./routes"));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate({ githubId: profile.id }, (err, user) => {
      return done(null, profile);
      // });
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get("/", (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out");
})

app.get("/github/callback", passport.authenticate("github", 
{ failureRedirect: "/api-docs", session: false}),
(req, res) => {
  req.session.user = req.user;
  res.redirect("/");
});

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception ${err}\n` + `Exception origin: ${origin}`,
  );
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
