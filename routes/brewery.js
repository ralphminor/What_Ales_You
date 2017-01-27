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
//{{this.brewery.id}}/{{this.brewery.name}}/{{this.streetAddress}}/{{this.locality}}/{{this.region}}/{{this.postalCode}}/{{this.phone}}"
/* GET brewery page by id. */
router
  .use(bodyParser.json())
  .get('/:brewery_id/:brewery_name/:brewery_address/:brewery_city/:brewery_state/:brewery_zip/:brewery_site/:brewery_phone', loginRequired, function(req, res) {
    request("http://api.brewerydb.com/v2/brewery/" + req.params.brewery_id + "/beers?key=" + process.env.api_key, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let allResults = JSON.parse(body).data;
         res.cookie.breweryId = req.params.brewery_id ? req.params.brewery_id : "not_listed";
         res.cookie.breweryName = req.params.brewery_name ? req.params.brewery_name  : "not_listed";
         res.cookie.breweryAddress = req.params.brewery_address ? req.params.brewery_address  : "not_listed";
         res.cookie.breweryCity = req.params.brewery_city ? req.params.brewery_city  : "not_listed";
         res.cookie.breweryState = req.params.brewery_state ? req.params.brewery_state  : "XX";
         res.cookie.breweryZip = req.params.brewery_zip ? req.params.brewery_zip  : "00000";
         res.cookie.brewerySite = req.params.brewery_site ? req.params.brewery_site  : "not_listed";
         res.cookie.breweryPhone = req.params.brewery_phone ? req.params.brewery_phone  : "000-000-0000";

        res.render('brewery', { beer: allResults, breweryName: req.params.brewery_name, breweryId: req.params.brewery_id});
      }
     });
  })
  .post('/:beerId/:breweryId', loginRequired, function(req, res, next) {
    request("http://api.brewerydb.com/v2/beer/" + req.params.beerId + "?key=" + process.env.api_key, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let allResults = JSON.parse(body).data;
        console.log(req.params.breweryId);
        console.log(`Final beweryName = ${req.cookies.breweryName}`);
        console.log(`But res breweryName = ${res.cookie.breweryName}`);

        let brewery_details = {
          name: res.cookie.breweryName,
          address1: res.cookie.breweryAddress,
          city: res.cookie.breweryCity,
          state: res.cookie.breweryState,
          zip: res.cookie.breweryZip,
          phone: res.cookie.breweryPhone,
          website: res.cookie.brewerySite,
          bdbid: req.params.breweryId
        }

        let beer_details = {
          brewery_id: null,
          name: allResults.name,
          style: allResults.style.category.name,
          abv: parseInt(allResults.abv),
          bdbid: req.params.beerId
        }

        let tasting_details = {
          user_id: req.user.id,
          date: "2017-01-01",
          location_favorited: false,
          beer_favorited: false,
          beer_id: null,
          brewery_id: null,
          beer_rating: req.body.rating,
          brewery_rating: 5
        }

    let brewery_id_promise = find_or_create_brewery(brewery_details);
    let brewery_id_and_beer_id_promise = find_or_create_beer(brewery_id_promise, beer_details);
    let inserted_tasting_obj_promise = insert_tasting(brewery_id_and_beer_id_promise, tasting_details);
    res.redirect('/users');
  }
  })
})

function find_or_create_brewery (breweryObj) {
  let brewery_id_promise = db("brewery")
    .where("bdbid", breweryObj.bdbid)
    .first()
    .then((brewery) => {
      if (brewery) {
        console.log(`Found brewery in db`);
        return brewery.id;
      }
      else {
        const newBrewery = breweryObj
        console.log("inserting brewery");
        let new_brewery_id_promise = db("brewery")
          .insert(newBrewery)
          .returning("id")
          .then((id) => {
            return id[0];
          })
        return new_brewery_id_promise;
      }
    })
    return brewery_id_promise;
}

function find_or_create_beer (brewery_id_promise, beerObj) {
  let outer_beer_id_promise = brewery_id_promise.then((brewery_id) => {
    let inner_beer_id_promise = db("beer")
      .where("bdbid", beerObj.bdbid)
      .first()
      .then((beer) => {
        if (beer) {
          console.log(`Found beer in db`);
          return { beer_id: beer.id, brewery_id: beer.brewery_id};
        }
        else {
          console.log(`Inserting new beer`);
          beerObj.brewery_id = brewery_id;
          let newBeer = beerObj;
          let new_beer_id_promise = db("beer")
            .insert(newBeer)
            .returning("id")
            .then((id) => {
              console.log(`Beer id follows`);
              console.log(id);
              return {beer_id : id[0], brewery_id: beerObj.brewery_id};
            })
          return new_beer_id_promise;
        }
      })
    return inner_beer_id_promise;
  })
  return outer_beer_id_promise
}

function insert_tasting (brewery_id_and_beer_id_promise, tasting_details) {
  brewery_id_and_beer_id_promise.then((ids) => {
    tasting_details.brewery_id = ids.brewery_id;
    tasting_details.beer_id = ids.beer_id;
    console.log(`Inserting tasting`);
    db("tasting")
      .insert(tasting_details)
      .returning("id")
      .then((data) => {
        console.log(data);
      })
  })
  return true;
}


module.exports = router;
