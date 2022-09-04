const express = require('express')
const router = new express.Router()
const User = require('../models/user');
const passport = require('passport');
const fs = require('fs')
const formidable = require('formidable');

const formMiddleWare = (req, res, next) => {
  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    req.fields = fields;
    req.files = files;
    next();
  });
};

router.get('/panel', (req,res)=>{
    if(req.session.passport == undefined) return res.render('login', {user: req.session.passport})
    res.render('panel', {user: req.session.passport})
})

router.get('/panel/addCar', (req,res)=>{
  if(req.session.passport == undefined) return res.render('login', {user: req.session.passport})
  res.render('addCar', {user: req.session.passport})
})

router.post('/panel/addCar', formMiddleWare, (req,res)=>{


  console.log({fields: req.fields,
    files: req.files,})
  if(req.session.passport == undefined) return res.json({status:false, error: 403})
  try{
    const elements = Object.values(req.body)
    
    elements.forEach(element => {
      if(element==null) return res.json({status:false, error: 'not element'})
    });

  }catch(err){
    console.log(err)
    return res.json({status:false, error: 400})
  }
  res.json({status:true})


})
// router.get('/reg', (req,res)=>{
//     res.render('reg')
// })
router.post('/login', passport.authenticate('local'), (req, res) => {
    User.findOne({
      username: req.body.username
    }, () => {
      res.statusCode = 302;
      res.redirect('/panel')
    })
  });

// router.post('/signup', (req, res) => {
//   User.register(new User({
//       username: req.body.username
//     }),
//     req.body.password, (err) => {
//       if (err) {
//         res.statusCode = 500;
//         res.setHeader('Content-Type', 'application/json');
//         res.json({
//           err: err
//         });
//       } else {
//         passport.authenticate('local')(req, res, () => {
//           User.findOne({
//             username: req.body.username
//           }, () => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json({
//               success: true,
//               status: 'Registration Successful!',
//             });
//           });
//         })
//       }
//     })
// });

module.exports = router;