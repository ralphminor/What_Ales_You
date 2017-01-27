const passport = require('passport');
const db = require("../db");
const router = require("express").Router();
const bodyParser = require('body-parser');
require("../passport");

function loginRequired(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

router
  .get('/', loginRequired, (req, res, next) => {
      res.redirect('/users');
  })
  .get('/', (req, res, next) => {
    res.render("landing")
  })
  .get('/login', (req, res, next) => {
    res.render("login")
  })
  .post("/login", passport.authenticate("local", {
    successRedirect: "/users",
    failureRedirect: "/loginRetry",
  }))
  .get("/loginRetry", (req, res) => {
    res.render("loginRetry");
  })
  .get("/logout", (req, res, next) => {
    req.session.destroy();
    res.redirect("/login");
  })
  .get("/signup", (req, res, next) => {
    res.render("signup")
  })
  .post("/signup", passport.authenticate("local-register", {
    successRedirect: "/",
    failureRedirect: "/loginRetry",
  }))
  .get('/auth/facebook', passport.authenticate('facebook'))
  .get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login' }))

module.exports = router;
