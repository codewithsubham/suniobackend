var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
app.use(cors());
app.use(function (req, res, next)
{
    console.log("asdasd");
    res.header("Access-Control-Allow-Origin", "*");

    next();
});

app.use("/", express.static(path.join(__dirname)));
//app.use('/static', express.static('1'))

app.listen(8000);
console.log('Listening on Port 8000');