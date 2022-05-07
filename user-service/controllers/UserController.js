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
        let password = await hashPswd.checkPassword(req.body.password);
        if(!password)
            return apiResponse.ErrorResponse(resp, "password not matched", 404);
        let values1 = await [req.body.username, req.body.name, password];
        let output = await userModel.insertUser(values1);
         console.log(password);
        // console.log(output.insertId);
        let email = req.body.username;
        // Create token
        const token = jwt.sign(
            { user_id: 1234, email },
                 process.env.TOKEN_KEY,
            {
                 expiresIn: "5s",
            }
        );

        var jsonData = {};
        jsonData['token'] = token;
        if(output)
            jsonData['msg'] = "user created Succesfully";
        else    
            jsonData['msg'] = "user not inserted";
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

// user details api with given id
// Method get
const userDetails = async (req, resp) => {
    try {
        console.log(req.body.username);
        console.log(req.body.password);
        console.log(req.params.id);

        let output = await userModel.getUser(req.params.id);
        var jsonData = {};  
        if(output.length)
            jsonData['msg'] = output;
        else    
            jsonData['msg'] = "user not found";
        return apiResponse.SuccessResponse(resp, jsonData['msg'], 200);

    } catch (err) {
        return apiResponse.ErrorResponse(resp, err.message, 500);
    }
}

// Delete user from DB
// Method Delete
const deleteUser = async (req, resp) => {
    try{
        let output = await userModel.deleteUser(req.params.id);
        console.log(output);
    } catch (err) {
        return apiResponse.ErrorResponse(resp, err.message, 500);
    }
}

module.exports = {login,register,userDetails,deleteUser};