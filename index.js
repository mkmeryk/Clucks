//express
const express = require('express');
const app = express();

//url encoder
app.use(express.urlencoded({extended:true}));

//cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//custom middleware
app.use((req,res,next) =>{

    const username = req.cookies.username;
    res.locals.username = "";
    if (username){

        res.locals.username = username;
        console.log(`signed in as ${username}`);

    }

    next();

})


//static assets middleware
const path = require('path');
app.use(express.static(path.join(__dirname,'public')));

//Logging middleware
const logger = require('morgan');
const exp = require('constants');
const { response } = require('express');
app.use(logger('dev'));

//ejs view engine
app.set('view engine','ejs');
app.set('views','views');

app.get('/',(req,res)=>{
    res.redirect('/clucks')
})

//sign in page
app.get('/signIn',(req,res) =>{
    res.render('./signIn')
})



//sign in
app.post('/sign_in',(req,res) =>{

    const COOKIE_MAX_AGE = 1000*60*60*24;
    const username = req.body.username;
    res.cookie('username',username,{maxAge:COOKIE_MAX_AGE});
    res.redirect('/clucks')

})

//sign out
app.post('/sign_out',(req,res) =>{
    res.clearCookie('username');
    res.redirect('/clucks');
})

//routers
const cluckRouter = require('./routes/clucks');
app.use('/clucks', cluckRouter)



//server
const PORT = 3000;
const DOMAIN = "localhost"

app.listen(PORT,DOMAIN, () =>{
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})