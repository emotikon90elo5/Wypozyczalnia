const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const passport = require("passport");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post("/login", passport.authenticate("local"), (req, res) => {
    User.findOne(
        {
            username: req.body.username,
        },
        () => {
            res.statusCode = 302;
            res.redirect("/panel");
        }
    );
});

// })
// router.get('/reg', (req,res)=>{
//     res.render('reg')
// })
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
