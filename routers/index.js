const express = require("express");

const router = new express.Router();

router.get('/', (req,res)=>{
    res.render("index", {user: req.session.passport})
})

router.get('/rent', (req,res) =>{
    res.render('rent', {user: req.session.passport})
})


module.exports = router

