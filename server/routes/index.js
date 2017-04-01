// modules required for routing
let express = require('express');
let router = express.Router();

// require the index controller
let indexController = require('../controllers/index');

/* GET home page. wildcard */
router.get('/', (req, res) => {
  indexController.DisplayHome(req, res);
});

/* GET contact page. */
router.get('/contact', (req, res) => {
  indexController.DisplayContact(req, res);
});

module.exports = router;
