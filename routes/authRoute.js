const User = require('../models/user');
var express = require('express');
var passport = require('passport');
var router = express.Router();
var authController = require('../controllers/authController');

router
  .route('/login')
  .post(passport.authenticate('local'), authController.login);

router.route('/register').post(authController.register);

module.exports = router;
