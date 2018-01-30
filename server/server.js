var express = require('express');
const path = require('path');
var app = express();
var router = express.Router();

const port = 3300;
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
app.use('/api', router);

app.get('/', (req, resp) => {
    resp.render('index');
});

app.listen(port, ()=> {
    console.log('Server is started on port 3300')
});