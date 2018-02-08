var mongoose = require('mongoose');
var {User} = require('./models/user');

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
    var ux = new User({
        username : newUser.username,
        password : newUser.password,
        email : newUser.email
    });
    return new Promise((resolve, reject) => {
        ux.save((err, user, nrAffected) => {
            if (err){
                console.log('Could not save user.', err);
                reject(err);
            }else{
                console.log('User Saved');
                resolve(user);
            }
        });
    });
    
}

module.exports = {
    connectToUserDb : connectToUserDb,
    saveNewUserToDB : saveNewUserToDB
};