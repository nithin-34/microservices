
const mysqlConnection = require("../config/db");

const insertUser = (values) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO users (email, full_name, passwrd) VALUES ?`;
        let values1 = [values];
        mysqlConnection.query(sql, [values1], (err, rows, fields)=>{
            if(!err){
                resolve(rows);
            }
            else{
                console.log(err);
                reject(err);
            }
        });
    })
}

const getUser = (values) => {
    return new Promise((resolve, reject) => {
        let sql = `Select userid,full_name,email from users where userid = ?`;
        let values1 = [values];
        mysqlConnection.query(sql, [values1], (err, rows, fields)=>{
            if(!err){
                resolve(rows);
            }
            else{
                console.log(err);
                reject(err);
            }
        });
    })
}

//mysql to get query details
const getQueryResult =  (sql,params = []) => {
    return new Promise((resolve, reject) => {        
        mysqlConnection.query(sql,params, (err, rows, fields)=>{
            if(!err){        
                resolve(rows);
            }
            else{
                console.log(err);
                reject(err);
            }
        });
    });
};

const deleteUser = (email) => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM users WHERE email = ?`;
        let values1 = [email];
        mysqlConnection.query(sql, [values1], (err, rows, fields)=>{
            if(!err){
                resolve(rows);
            }
            else{
                console.log(err);
                reject(err);
            }
        });
    })
}

module.exports = { insertUser, getQueryResult, deleteUser, getUser}