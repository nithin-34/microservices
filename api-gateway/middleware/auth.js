const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");

const verifyJwt = (req, res, next) => {
    let token = ""; 
    const { headers } = req;

    if(!headers.authorization)
        return apiResponse.ErrorResponse(res, "unAuthorized", 401);

    const bearer = headers.authorization.split(' ');
    if (bearer.length == 2 && bearer[0] == 'Bearer') 
        token = bearer[1];
    else return apiResponse.ErrorResponse(res, "unAuthorized! looking for bearer token.", 401);

    if (!token) {
        return apiResponse.ErrorResponse(res, "A token is required for authentication", 403);
    }

    try {
       let decoded = jwt.verify(token, process.env.TOKEN_KEY);
       req.user = decoded;
    //    console.log("jet decoe");
    //    console.log(decoded);
    } catch (err) {
       // console.log(err.message);
       return apiResponse.ErrorResponse(res, err.message, 401);
    }
    return next();

}

module.exports = verifyJwt;