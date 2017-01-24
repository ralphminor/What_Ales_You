const bcrypt = require("bcrypt-nodejs");
const dotenv = require('dotenv');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const db = require("./db");
dotenv.load();

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.use(new LocalStrategy(authenticate));
passport.use("local-register", new LocalStrategy({passReqToCallback: true}, register))

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: process.env.fb_cb_url
  },
  function(accessToken, refreshToken, profile, done) {
    db("users")
      .where("oauth_provider", "facebook")
      .where("oauth_id", profile.id)
      .first()
      .then((user) => {
        if (user) {
          return done(null, user)
        }
        const newUser = {
          oauth_provider: "facebook",
          oauth_id: profile.id,
          username: profile.displayName,
          is_admin: false
        };

        db("users")
          .insert(newUser)
          .returning("id")
          .then((id) => {
            newUser.id = id[0];
            done(null, newUser);
          })
      })
  }))

function authenticate(email, password, done) {
  db("login_info")
    .where("email", email)
    .first()
    .then((user) => {
      if(!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, {message: "Invalid user and password combination."});
      }
      done(null, user)
    }, done)
}

function register(req, email, password, done) {
  db("login_info")
    .where("email", email)
    .first()
    .then((user) => {
      if (user) {
        return done(null, false, {message: "An account with that email has already been created."})
      }
      if (password !== req.body.password2) {
        return done(null, false, {message: "Passwords do not match."})
      }
      const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: email,
        email: email,
        password: bcrypt.hashSync(password),
        is_admin: false
      };

      db("login_info")
        .insert(newUser)
        .returning("id")
        .then((id) => {
          newUser.id = id[0];
          done(null, newUser);
        })
    })
}


passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  db("users")
    .where("id", id)
    .first()
    .then((user) => {
      done(null, user)
    }, done)
})
