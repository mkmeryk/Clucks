//express
const express = require('express');
const app = express();

//static assets middleware
const path = require('path');
app.use(express.static(path.join(__dirname,'public')));

//Logging middleware
const logger = require('morgan');
const exp = require('constants');
app.use(logger('dev'));

//ejs view engine
app.set('view engine','ejs');
app.set('views','views');










//server
const PORT = 3000;
const DOMAIN = "localhost"

app.listen(PORT,DOMAIN, () =>{
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})