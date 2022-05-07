var express = require("express");
const userController = require("../../controllers/UserController");
const Router = express.Router();

Router.post('/login', userController.login);

Router.post('/register', userController.register);

Router.get('/:id', userController.userDetails);

Router.delete('/:id', userController.deleteUser);

Router.get('/', (req,res) => {
    res.status(200).json("no page");
})


module.exports = Router;