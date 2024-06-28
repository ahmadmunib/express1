var express = require('express');
var router = express.Router();

var { updateArray , getAboutPage } = require('../controllers/AboutController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/** a route that will use a controller */
router.get('/about', getAboutPage);

router.post('/about', updateArray );


module.exports = router;