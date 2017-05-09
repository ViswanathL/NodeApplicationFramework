var express = require('express');
var router = express.Router();
var validate = require('./util/validation');
var validationParams = require('./util/validation.params');
require('./util/util')();
var logger = require('./logger/winstonConfig');
var user = require('./rest/user/user.controller');

var urls = {
	users: '/users'
};

// Users
router.get(urls.users + '/:user_id', validate.validateRequest(validationParams.getUser), user.get);

module.exports = router;
