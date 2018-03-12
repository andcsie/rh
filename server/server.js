
var express = require('express');
const path = require('path');
const authutils = require('./authentication/authutils');
const dbfunct = require('./db/dbutilities');
const bodyParser = require('body-parser');
var app = express();

const port = process.env.PORT || 3300;
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
app.use(bodyParser.json());

app.post('/create', (req, rsp) => {
    var userCredentials = req.body;
    dbfunct.connectToUserDb().then(() => {
        dbfunct.retrieveUserDetails(userCredentials).then((result) => {
            if (Object.keys(result).length === 0){
                authutils.validateCreateAccountFields(userCredentials).then(() => {
                    authutils.passwordHash(userCredentials).then(() => {
                        dbfunct.saveNewUserToDB(userCredentials).then((user) => {
                            rsp.send(user);
                        }).catch((saveError) => {
                            console.log("Error in saving user!");
                        })
                    }).catch((hashError) => {
                        console.log("Error while hashing!");
                    });
                }).catch((validationError) => {
                    console.log("Error in validation!");
                    rsp.send(validationError);
                });
            }else{
                rsp.send("User already defined!");
            }
        }).catch((retrieveError) => {
            console.log(retrieveError);
            console.log("Error in retriving from DB!");
        });
    }).catch((connectionError) => {
        console.log("Unable to connect to database!");
        rsp.send(connectionError);
    });
});

app.post('/login', (req, res) => {
    var loginCredentiaDials = req.body;
    dbfunct.connectToUserDb().then(() => {
        dbfunct.retrieveUserDetails(loginCredentiaDials).then((result) =>{
            let dbObject = Object.assign({}, result);
            authutils.validateCredentials(dbObject[0], loginCredentiaDials.password).then((validateResult) => {
                console.log("Login validated");
                res.send("Login Succesful!");
            }).catch((validationError) => {
                console.log("Validation Error!");
                res.send("Incorrect password!");
            });
        }).catch((error) => {
            console.log("Retrieval error");
            res.send("User not found");
        });
    }).catch((dbconnErr) => {
        console.log("Error while connecting to DB");
        res.send(dbconnErr);
    });
});

app.get('/', (req, resp) => {
    resp.render('index');
});

app.listen(port, ()=> {
    console.log(`Server is started on port ${port}`);
});