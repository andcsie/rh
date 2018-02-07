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

module.exports = {
    validateCreateAccountFields : validateCreateAccountFields
}