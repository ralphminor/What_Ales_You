const passport = require('passport');
const db = require("../db");
const router = require("express").Router();
const bodyParser = require('body-parser');
const request = require('request');
const queries = require("../queries");
require("../passport");

router.get('/', function(req, res, next) {
  res.render('dash')
});

module.exports = router;
