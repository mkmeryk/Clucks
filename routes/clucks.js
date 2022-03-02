//requiring cookieparser,express,knex and router
const cookieParser = require('cookie-parser');
const express = require('express');
const knex = require('../db/client');
const router = express.Router();

//showing all the clucks
router.get('/',(req,res) =>{

    //using faker to generate random avatar photos
    const faker = require('faker');
    const avatar = faker.image.nature(50,50,true);


    //using clucks database to access the clucks 
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

    //accessing the data base to insert the new info for a new cluck in the database
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

//exporting
module.exports = router

