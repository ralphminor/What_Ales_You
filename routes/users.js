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

function adminRequired(req, res, next) {
  if (!req.user.is_admin) {
    return res.render("403", { userName: req.user.username, authenticated: true });
  }
  next();
}

router
  .use(bodyParser.json())
  .get("/", (req, res, next) => {
    res.render("users"), next;
  })
  // .get("/", loginRequired, adminRequired, (req, res, next) => {
  //   res.send("users 2");
  //   // db("contact_info").then((users) => {
  //   //   res.render("users", {
  //   //     title: "All Users",
  //   //     contact_info,})
  //   // }, next)
  // })



module.exports = router;
