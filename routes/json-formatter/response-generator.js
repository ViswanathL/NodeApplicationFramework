var config =  require('./response.config')();

exports.buildSuccessResponse = function buildSuccessResponse(message, data) {
	var response = config.succ_response;
	response.message = message;
	response.data = data;
	return response;
}

exports.buildFaliureResponse = function buildFaliureResponse(message, data) {
	var response = config.err_response;
	response.message = message;
	response.data = data;
	return response;
}

exports.buildValidationError = function buildValidationError(data) {
	var response = config.val_response;
	response.data = data;
	return response;
}