const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/webdev');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
               "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
               "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/hello', (req, res) => {
    res.send('Hello World! a8');
});

//a8
require('./service/movies-service')(app);
//require('./service/tweeter-service')(app);
//require('./service/profile-service')(app);
require('./movies/service')(app);

//a9
require('./db/tweets/tweeter-service')(app);
require('./db/who/who-service')(app);
require('./db/profile/profile-service')(app);

app.listen(process.env.PORT || 4000);