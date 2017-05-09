var Promise = require("bluebird");
var repository = require("../repository/common.repository");
var suid = require('rand-token').suid;
var User = require('../../../models/user.model');

exports.get = function get(userId) {
	return repository.findOne(User, {user_id: userId}, 'first_name last_name user_id -_id');
}