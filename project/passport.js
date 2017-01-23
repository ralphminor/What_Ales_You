const bcrypt = require("bcrypt-nodejs");
const dotenv = require('dotenv');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db");
dotenv.load();

passport.use(new LocalStrategy(authenticate));
passport.use("local-register", new LocalStrategy({passReqToCallback: true}, register))

function authenticate(email, password, done) {
  console.log("authenticating");
  db("users")
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
  db("users")
    .where("email", email)
    .first()
    .then((user) => {
      if (user) {
        return done(null, false, {message: "an account with that email has already been created"})
      }
      if (password !== req.body.password2) {
        return done(null, false, {message: "passwords don't match"})
      }
      const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: email,
        email: email,
        password: bcrypt.hashSync(password),
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
