var express = require('express');
var router = express.Router();

// get splash page
router.get('/', function(req, res, next) {
  res.render('splash')
});

module.exports = router;
