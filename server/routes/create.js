var express = require('express');
var router = express.Router();

router.post('/create', (req, rsp) => {
    rsp.send("Created");
});

