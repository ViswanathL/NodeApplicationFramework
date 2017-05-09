var config = {
	code_err:0,
	code_succ:1,
	code_err_val:3,
	success: "SUCCESS",
	error: "ERROR",
	val_err: "VALIDATION ERROR",
	mess_validation: "Validation Failure"
};

var successResponse = {
	"status": config.success,
	"message_code":config.code_succ   
};

var faliureResponse = {
	"status": config.error,
	"message_code":config.code_err
};

var validationResposne = {
	"status": config.error,
	"message_code": config.code_err_val,
	"message": config.mess_validation
};

module.exports = function() {
	return {
		val_response: validationResposne,
		err_response: faliureResponse,
		succ_response: successResponse
	};
}