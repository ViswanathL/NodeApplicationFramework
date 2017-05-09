var passport = require("passport");
var passportJwt = require('passport-jwt');
var jwtStrategy = passportJwt.Strategy,
    extractJwt = passportJwt.ExtractJwt;
var config = {
	authScheme: 'Bearer',
	jwtSecret: 'antony.node.framework',
	jwtSession: { session: false },
};
/*
* Validate the session time
*/
function validateSession(jwtPayload) {
	var currentTime = new Date().getTime();
	var expiry = new Date(jwtPayload.expired_at).getTime();
	console.log(expiry - currentTime);
	if(expiry < currentTime) {
		console.log('*** Session expired ***');
		return false;
	}
	return true;
}
/*
* If there is a JWT token, pass it
* All validations are performed here
*/
function authenticate(req, res, next) {
	passport.authenticate('jwt', config.jwtSession, function(err, jwtPayload) {
		if(err || !jwtPayload) {
			console.log(err);
			return res.sendStatus(403);
		} else {
			if(!validateSession(jwtPayload)) {
				return res.sendStatus(401);
			} else if(!hasRole('STUDENT', jwtPayload)) {
				return res.sendStatus(403);
			} else {
				req.jwtPayload = jwtPayload;
				next();
			}
		}
	}) (req, res, next);
}

module.exports = function() {
	var options = {};
	options.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme(config.authScheme);
	options.secretOrKey = config.jwtSecret;

	// Check for a valid JWT token
	passport.use('jwt', new jwtStrategy(options, function(jwtPayload, next) {
		next(null, jwtPayload);
	}));

	return {
		authenticate: authenticate
	};
}

