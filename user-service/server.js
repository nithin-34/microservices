const express = require('express');
const app = express();
require("dotenv").config();
const bodyParser = require('body-parser');
var apiResponse = require("./helpers/apiResponse");
const apiUserRoute = require("./routes/api/users");

var server = require('http').createServer(app);

global.BASEPATH = __dirname;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Route Prefixes
app.use('/', apiUserRoute);

// throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.ErrorResponse(res, "user service The page you are looking is not found", 404);
});

// hostname and port defined
const hostname = process.env.HOST;
const port = process.env.PORT;

//listeing to port 
server.listen(port || 3031, () => {
    var host = server.address().address
    var port = server.address().port
    console.log(`Server running at http://${host}:${port}/`);
  });