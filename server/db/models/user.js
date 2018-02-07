var mongoose = require('mongoose');

var user = mongoose.Model('User', {
   username : {
       type : String,
       required : true
   }, 
   password : {
       type : String,
       required : true
   },
   email : {
       type: String,
       required : true
   }
});

module.exports = {
    user: user
};