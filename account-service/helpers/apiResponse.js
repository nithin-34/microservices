const SuccessResponse = function (res, data, httpCode) {
	var data = {
        status: 1,
        http_code:httpCode,
		message: data
	};
	return res.status(httpCode).json(data);
};

const ErrorResponse = function (res, msg, httpCode) {
	var data = {
		status: 0,
        http_code:httpCode,
		message: msg,
	};
	return res.status(httpCode).json(data);
};

module.exports = {SuccessResponse, ErrorResponse}