let userModel = require("../models/usersModel");
var apiResponse = require("../helpers/apiResponse");
var hashPswd = require("../helpers/hashing");
const jwt = require("jsonwebtoken");
const { body, validationResult, sanitizeBody } = require("express-validator");

// Login api 
// Method POST
const login = async (req, resp) => {
    try {
        console.log(req.body.username);
        console.log(req.body.password);

        let userDetals = await userModel.getQueryResult("select * from users where email = ?", req.body.username);
        if(userDetals.length == 0)
            return apiResponse.ErrorResponse(resp, "User not found", 404);

        let password = await hashPswd.checkPassword(req.body.password,userDetals[0].passwrd);
        if(!password)
            return apiResponse.ErrorResponse(resp, "password not matched", 404);
        
        let email = req.body.username;
        // Create token
        const token = jwt.sign(
            { user_id: userDetals.userid, email },
                 process.env.TOKEN_KEY,
            {
                 expiresIn: "24h",
            }
        );

        var jsonData = {};
        jsonData['userid'] = userDetals[0].userid;
        jsonData['email'] = userDetals[0].email;
        jsonData['full_name'] = userDetals[0].full_name;
        jsonData['token'] = token;
        
        return apiResponse.SuccessResponse(resp, jsonData, 200);
    } catch (err) {
        return apiResponse.ErrorResponse(resp, err.message, 500);
    }
}
// Register api 
// Method POST
const register = async (req, resp) => {
    try {

        console.log(req.body.username);
        console.log(req.body.password);
        let password = await hashPswd.hashPassword(req.body.password);
        let values1 = await [req.body.username, req.body.name, password];
        let output = await userModel.insertUser(values1);
       // console.log(output);

        var jsonData = {};
        
        if(output){
            jsonData['msg'] = "user created Succesfully";
            let email = req.body.username;
            // Create token
            const token = jwt.sign(
                { user_id: output.insertId, email },
                    process.env.TOKEN_KEY,
                {
                    expiresIn: "24h",
                }
            );
            jsonData['token'] = token;
        }
        else    
            jsonData['msg'] = "user not inserted";
        return apiResponse.SuccessResponse(resp, jsonData, 200);

    } catch (err) {
        return apiResponse.ErrorResponse(resp, err.message, 500);
    }
}


module.exports = {login,register};