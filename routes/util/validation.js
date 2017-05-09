var jsonUtil = require('../json-formatter/response-generator');
exports.validateRequest = function validateRequest(validationRules) {
	return function(req, res, next) {
		Object.keys(validationRules).forEach(function(rule) {
			var fieldsApplicableToRule = validationRules[rule];

			fieldsApplicableToRule.forEach(function(field) {
				var ruleName = rule.split(':');
				switch(ruleName[1]) {
					case 'not_empty':
						getValidationInstance(req, ruleName[0], field, ' required').notEmpty();
					break;
					case 'is_email':
						getValidationInstance(req, ruleName[0], field, ' is not a valid email').isEmail();
					break;
					case 'is_int':
						getValidationInstance(req, ruleName[0], field, ' is not a valid number').isInt();
					break;
					case 'is_bool':
						getValidationInstance(req, ruleName[0], field, ' is not a valid boolean').isBoolean();
					break;
					case 'is_valid_role':
						getValidationInstance(req, ruleName[0], field, ' is not a valid role').validRole();
					break;
					case 'is_array':
						getValidationInstance(req, ruleName[0], field, ' is not a valid array').isArray();
					break;
				}
			});
		});
		returnResponse (req.validationErrors(), res, next);		
	};
};

function getValidationInstance(req, ruleNamePrefix, field, message) {
	switch(ruleNamePrefix) {
		case 'q':
			return req.checkQuery(field, field + message);
		case 'p':
			return req.checkParams(field, field + message);
		case 'b':
			return req.checkBody(field, field + message);
		default:
			console.log('Unknown validation type : ' + ruleNamePrefix);
		break;
	}
}

function returnResponse(err, res, next ) {
	if(err) {
		res.json(jsonUtil.buildValidationError(err));
	} else {
		next();
	}
}