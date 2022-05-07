var express = require("express");
const userController = require("../../controllers/UserController");
const Router = express.Router();

Router.post('/login', userController.login);

Router.post('/register', userController.register);


module.exports = Router;