const passport = require('passport');
const db = require("../db");
const router = require("express").Router();
const bodyParser = require('body-parser');
const request = require('request');
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
  .get('/', loginRequired, function(req, res) {
    request("https://api.brewerydb.com/v2/search/geo/point?lat=" + req.cookies.latitude + "&lng=" + req.cookies.longitude + "&key=" + process.env.api_key, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let allResults = JSON.parse(body).data;
        res.render('nearby', {
          brews: allResults.filter(function(item) { return item.name === "Main Brewery"}).splice(0, 12),
          lat: req.params.lat,
          lng: req.params.lon});
      }
     });
  })

module.exports = router;
