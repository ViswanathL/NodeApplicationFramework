
// Holds the Parameters for API parameters validations
var validations = {
	emailAPI: {
		'b:not_empty': ['username', 'password', 'token'],
		'b:is_email': ['username']
	}
};

var customValidations = {
	customValidators: {
	    isOrder: function(value) {
	        return value === 1 || value === -1;
	    },
	    isBoolean: function(value) {
	        return (typeof value == 'boolean');
	    },
	    isArray: function(value) {
   			return Array.isArray(value);
 		},
 		eachIsEmpty: function(values, prop) {
	      	return values.every(function(val) {
	         	return val[prop] && val[prop] !== '';
	      	});
	    }
	 }
};

module.exports = function() {
	return {
		validations : validations,
		customValidations: customValidations
	};
};