let bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                if(!err) resolve(hash);
                else{
                    console.log(err);
                    reject(err);
                }
            });
        });
    })
}

const checkPassword = (password, hash = "$2a$10$WfuuJbLikeVnroSKCmXEHODvyzRa1pSn.pzzgcaSlm3jhD2s91ZOG") => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function(err, res) {
            if(!err) resolve(res);
            else{
                console.log(err);
                reject(err);
            }
        });
    })
}

module.exports = {hashPassword, checkPassword}