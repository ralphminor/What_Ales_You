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
  .get('/:lat/:lon', function(req, res) {
    request("https://api.brewerydb.com/v2/search/geo/point?lat="+req.params.lat+"&lng=" + req.params.lon + process.env.api_key, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let allResults = JSON.parse(body).data;
        res.render('nearby', { brews: allResults});
        //res.send(brewers.data[0]);
      }
     });
  })




  //   db("beer").then((beers) => {
  //     res.render("beers", {
  //       title: "All Beers",
  //       beers,})
  //   }, next)
  // })

module.exports = router;
