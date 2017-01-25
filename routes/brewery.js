var express = require('express');
var router = express.Router();

/* GET brewery page by id. */
router.get('/:id', function(req, res, next) {
  res.render('brewery', { id: req.params.id });

});

module.exports = router;
