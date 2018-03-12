const crypto = require('crypto');

function validateLoginAction(login){
    var result = login;
    var error = {};
    return new Promise((resolve, reject) => {
        if (!login.hasOwnProperty('username')){
            error = {
                errorCode : 1,
                errorDesc : "The login should contain username!"
            };
            reject(error);
        }
        if (!login.hasOwnProperty('password')){
            error = {
                errorCode : 2,
                errorDesc : "The login should contain password!"
            };
            reject(error);
        }
        resolve(result);
    });
}

function validateCreateAccountFields(account){
    var error = {};
    return new Promise((resolve, reject) => {
        if (!account.hasOwnProperty('username')){
            error = {
                errorCode : 1,
                errorDesc : 'The input object does not contain username'
            };
            reject(error);
        }
        if (!account.hasOwnProperty('password')){
            error = {
                errorCode : 2,
                errorDesc : 'The input object does not contain password'
            };
            reject(error); 
        }
        if (!account.hasOwnProperty('email')){
            error = {
                errorCode : 2,
                errorDesc : 'The input object does not contain email'
            };
            reject(error); 
        }
        resolve(account);
    });
}

function generateRandomString(){
    return crypto.randomBytes(16).toString('hex');
}

function passwordHash(account){
    var result = account;
    return new Promise((resolve, reject) => {
        if (account.password === ""){
            return reject();
        }else{
            var salt = generateRandomString();
            var hashed = crypto.createHmac('sha512', salt);
            hashed.update(account.password);
            var valueHashed = hashed.digest('hex');
            result.password = valueHashed;
            result.salt = salt;
            return resolve(result);
        }
    });
}

function validateCredentials(userLogin, password){
    console.log("[validate login credentials]");
    var result = Object.assign({}, userLogin);
    var salt = userLogin.salt;
    return new Promise((resolve, reject) => {
        var hasedPwd = crypto.createHmac('sha512', salt).update(password).digest('hex');
        if (hasedPwd === userLogin.password){
            resolve(result);
        }else{
            reject(hexHash);
        }  
    });
}

module.exports = {
    validateCreateAccountFields : validateCreateAccountFields,
    passwordHash : passwordHash,
    generateRandomString : generateRandomString,
    validateLoginAction : validateLoginAction,
    validateCredentials : validateCredentials
}