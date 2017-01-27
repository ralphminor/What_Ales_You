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
        allResults.forEach( function(element) {
          element.brewery.id = element.brewery.id || "not_listed";
          element.brewery.name = element.brewery.name || "not_listed";
          element.streetAddress = element.streetAddress || "not_listed";
          element.locality = element.locality || "not_listed";
          element.region = element.region || "XX";
          element.postalCode = element.postalCode || "00000";
          if (element.brewery.website) {
            element.brewery.website = encodeURIComponent(element.brewery.website);
          }
          else {
            element.brewery.website = "not_listed";
          }
          element.phone = element.phone || "000-000-0000";
        });
        console.log(`All results *** ${allResults}`);
        res.render('nearby', {
          brews: allResults.filter(function(item) { return item.name === "Main Brewery"}).splice(0, 50),
          lat: req.params.lat,
          lng: req.params.lon});
      }
     });
  })

module.exports = router;
