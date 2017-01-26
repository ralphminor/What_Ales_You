const passport = require('passport');
const db = require("../db");
const router = require("express").Router();
const bodyParser = require('body-parser');
const request = require('request');
const queries = require("../queries");
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
  .get('/:id/:name', loginRequired, function(req, res) {
    request("http://api.brewerydb.com/v2/brewery/" + req.params.id + "/beers?key=" + process.env.api_key, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let allResults = JSON.parse(body).data;
        res.render('brewery', { beer: allResults, breweryName: req.params.name});
      }
     });
  })
  .post('/:id', loginRequired, function(req, res) {
    let newTaste = {
      user_id: req.user.id,
      beer_id: req.params.id,
      beer_rating: req.body.rating
    }
    // queries.getTates().then(function(newTaste) {
    //   queries.insertTaste(newTaste)
    // })
    console.log(`the object user_id is ${newTaste.user_id}`);
    res.redirect(`back`)
  })

module.exports = router;
