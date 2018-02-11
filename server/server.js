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
    dbfunct.connectToUserDb().then(authutils.validateCreateAccountFields(userCredentials)
                             .then(authutils.passwordHash(userCredentials))
                             .then(dbfunct.saveNewUserToDB((userCredentials))))
                             .then((result) => {
        rsp.send(result);
    }).catch((err) => {
        rsp.send(err);
    });
});

app.post('/login', (req, res) => {
    var loginCredentials = req.body;
    dbfunct.connectToUserDb().then(authutils.validateLoginAction(loginCredentials))
                             .then(dbfunct.retrieveUserDetails(loginCredentials))
                             .then((result)=> {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

app.get('/', (req, resp) => {
    resp.render('index');
});

app.listen(port, ()=> {
    console.log(`Server is started on port ${port}`);
});