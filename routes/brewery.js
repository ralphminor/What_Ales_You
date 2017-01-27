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
        res.cookie('breweryName', req.params.name)
        res.render('brewery', { beer: allResults, breweryName: req.params.name, breweryId: req.params.id,
          breweryNameSearch: encodeURIComponent(req.params.name)});
      }
     });
  })
  .post('/:beerId/:breweryId', loginRequired, function(req, res) {
    let newTaste = {
      user_id: req.user.id,
      beer_id: req.params.beerId,
      brewery_id: req.params.breweryId,
      beer_rating: req.body.rating
    }
    // queries.getTates().then(function(newTaste) {
    //   queries.insertTaste(newTaste)
    // })
    console.log(`brewery name is ${req.cookies.breweryName}`);
    console.log(`the brewery is ${newTaste.brewery_id}, the beer is ${newTaste.beer_id}, the user is ${newTaste.user_id}, the rating is ${newTaste.beer_rating}`);
    res.redirect(`back`)
  })

module.exports = router;
