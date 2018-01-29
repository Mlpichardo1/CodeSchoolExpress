var express = require('express')
var app = express();
var logger = require('./logger');
app.use(logger);

app.use(express.static('public')); //MIDDLEWARE
// EXPRESS Level 5
var blocks = require('./routes/block');
app.use('/cities', blocks);


app.listen(process.env.PORT);