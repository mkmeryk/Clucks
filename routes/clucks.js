const cookieParser = require('cookie-parser');
const express = require('express');
const knex = require('../db/client');
const router = express.Router();

//showing all the clucks
router.get('/',(req,res) =>{
    const faker = require('faker');
    const avatar = faker.image.nature(50,50,true);

    knex('clucks')
    .orderBy('created_at','desc')
    .then(clucks =>{
        res.render('clucks/index',{clucks:clucks,avatar:avatar})
    })
})

//creating a new cluck template
router.get('/new',(req,res) =>{
    res.render('clucks/new', {cluck:false})
})

//adding a new cluck
router.post('/',(req,res) =>{
    knex('clucks')
    .insert({
        content: req.body.content,
        image_url: req.body.image_url,
        username: req.cookies.username
    })
    .returning('*')
    .then(clucks =>{
        const cluck = clucks[0];
        res.redirect('/clucks')
    })
})



module.exports = router