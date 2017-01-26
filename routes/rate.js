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
  .get('/', function(req, res) {
    queries.getTates().then(function(data) {
        res.render('rate', { data })
    }).catch(function(err){
        console.log(err)
        res.send(err)
    })
})
  .post('/:id', function(req, res) {

    console.log(req.body);
    res.send("success!")
    // res.redirect(`/rate/${req.params.id}`)
  })

module.exports = router;
