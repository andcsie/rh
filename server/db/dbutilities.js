var mongoose = require('mongoose');

function connectToUserDb(){
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://localhost:27017/auth', (err, db) => {
            if(err){
                console.log('Unable to connect to db');
                reject(err)
            }else{
                console.log('Connected');
                resolve(db);
            }
        });
        
    });
}

function saveNewUserToDB(newUser){
    
}

module.exports = {
    connectToUserDb : connectToUserDb
};