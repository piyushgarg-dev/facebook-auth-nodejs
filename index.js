const express = require("express");
const passport = require("passport");
const Strategy = require("passport-facebook").Strategy;

const app = express();

var clientID = "";
var clientSecret = "";

passport.use(
  new Strategy(
    {
      clientID: "324404411807795",
      clientSecret: af744f7395e86f25f1acffb443115da3,
      callbackURL: "http://localhost:300/login/facebook/return"
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "lco app",
    resave: true,
    saveUninitialized: true
  })
);

//@route   -   GET  /
//@desc    -   A route to home page
//@access  -   PUBLIC
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

//@route   -   GET  /login
//@desc    -   A route to login page
//@access  -   PUBLIC
app.get("/login", (req, res) => {
  res.render("login");
});

//@route   -   GET  /login/facebook
//@desc    -   A route to facebook auth
//@access  -   PUBLIC
app.get("/login/facebook", passport.authenticate("facebook"));

//@route   -   GET  /login/facebook/callback
//@desc    -   A route to facebook auth
//@access  -   PUBLIC
app.get(
  "login/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/logn" }, function(
    req,
    res
  ) {
    res.redirect("/");
  })
);

//@route   -   GET  /profile
//@desc    -   A route to profile page
//@access  -   PRIVATE
app.get(
  "/profile",
  require("connect-ensure-login").ensureLoggedIn(),
  (req, res) => {
    res.render("profile", { user: req.user });
  }
);

//Listner
app.listen(process.env.PORT || 3000, () =>
  console.log("Server Started: " + 3000)
);
