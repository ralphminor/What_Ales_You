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
    return res.render("403");
  }
  next();
}

router
  .use(bodyParser.json())
  .get("/", loginRequired, (req, res, next) => {
    db("beer").innerJoin("tasting", function() {
      this.on('tasting.beer_id', '=', 'beer.id')
    })
    .then((beers) => {
      res.render("dash", {
        beers,})
    }, next)
  })

module.exports = router;
