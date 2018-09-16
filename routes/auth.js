"use strict"
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


//==========
router.get('/', (req, res) => {
    res.render('lending', { currentUser: req.user });
});


//=====================
//AUTH ROUTES
//show register form
router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', (req, res) => {
    //register user take like args username, password, callback. In callback we are making authentication
    User.register(new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
            if (err) {
                console.log(err);
                req.flash('error', ` ${err.message}`);
                return res.redirect('/register');
            }
            //passport authenticate take 3 args req, res and callback
            passport.authenticate('local')(req, res, () => {
                req.flash('success', `Welcome to Yelp Camp ${user.username}`);
                res.redirect('/campgrounds');
            });
        });
});
//login routes
router.get('/login', (req, res) => {
    res.render('login');
});

//middleware
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }),
    (req, res) => {
        console.log(err);
    });

//logout routes
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success','Log you out');
    res.redirect('/campgrounds');
    //still can go to /secret
});



module.exports = router;
