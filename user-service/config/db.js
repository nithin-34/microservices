const mysql = require("mysql");
require("dotenv").config();

const mysqlConnection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    multipleStatements : true
});

mysqlConnection.connect((err) => {
    if(!err){
        console.log("Mysql Connected!");
    }else{
        console.log("Error while connecting to mysql DB.");
        console.log(err);
    }
});

module.exports = mysqlConnection;