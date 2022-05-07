const SuccessResponse = function (res, data, httpCode) {
	var data = {
        status: 1,
        http_code:httpCode,
		message: data
	};
	res.setHeader('Content-type', 'application/json');
	res.statusCode = httpCode;
	return res.end(JSON.stringify(data));
};

const ErrorResponse = function (res, msg, httpCode) {
	var data = {
		status: 0,
        http_code:httpCode,
		message: msg
	};
	res.setHeader('Content-type', 'application/json');
	res.statusCode = httpCode;
	return res.end(JSON.stringify(data));
};

module.exports = {SuccessResponse, ErrorResponse}