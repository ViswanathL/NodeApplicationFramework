var logger = require('../../logger/WinstonConfig');
var Promise = require("bluebird");
var userService = require('./user.service');
var jsonUtil = require('../../json-formatter/response-generator');
var version = "1.0.19";

/**
* @api {get} /user/:id Request User information
* @apiVersion @var version
* @apiDescription 
*
* Used to obtain user details
* @apiName GetUser
* @apiGroup User
*
* @apiParam {Number} id Users unique ID.
*
* @apiSuccess {String} firstname Firstname of the User.
* @apiSuccess {String} lastname  Lastname of the User.
* @apiError UserNotFound The <code>id</code> of the User was not found.
* @apiError jwtTokenMissing The header of api request doesn't contain jwt token.
* @apiError InvalidjwtToken The jwtoken provided is invalid.
* @apiError sessionExpired Session expired.
* @apiErrorExample {json} Error-Response:
* HTTP/1.1 200 OK
* {
*	"status": "ERROR",
*	"message_code": 0,
*	"message": "Invalid User ID"
* }
* @apiErrorExample {json} Error-Response:
* HTTP/1.1 404 
* @apiSuccessExample {json} Success-Response:
* HTTP/1.1 401 Forbiden
* {
*	"firstname": "John",
*	"lastname": "Doe",
*	"email":"anotnyk@gmail.com"
* }
* @apiErrorExample {json} Error-Response:
* HTTP/1.1 403 OK
* {
*	"status": "ERROR",
*	"message_code": 0,
*	"message": "Invalid User ID"
* }
*/
exports.get = function(req, res) {
	userService.get(req.params.user_id).then(function (data) {
		return res.json(jsonUtil.buildSuccessResponse("User fetched successfully", data));
	}).catch(e => {
		// console.log(e);
		return res.json(jsonUtil.buildFaliureResponse("Failed to retrieve user", e));
	});
}