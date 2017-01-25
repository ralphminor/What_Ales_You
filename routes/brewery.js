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

/* GET brewery page by id. */
router
  .use(bodyParser.json())
  .get('/:id/:name', function(req, res) {
    request("http://api.brewerydb.com/v2/brewery/" + req.params.id + "/beers?key=" + process.env.api_key, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let allResults = JSON.parse(body).data;
        res.render('brewery', { beer: allResults, breweryName: req.params.name});
      }
     });
  })

module.exports = router;
