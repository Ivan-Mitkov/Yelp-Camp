"use strict"

const express=require('express');
const router=express.Router();

const Campground=require('../models/campground');

//Index rout show all campgrounds
router.get('/', (req, res) => {
    // console.log(req.user);
    //   get all campground from db
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log('Error retrieving campgrounds');
        } else {
            res.render('campgrounds/index', { campgrounds: allCampgrounds, currentUser: req.user });
        }

    })

});

//NEW - show form to create new campground
router.get('/new',isLoggedIn, (req, res) => {
    res.render('campgrounds/new.ejs');
});

//CREATE rout add new campground to th DB
router.post('/',isLoggedIn, (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let author={
        id:req.user._id,
        username:req.user.username
    }
    let newCampGround = { name: name, image: image, description: description,author:author };
    console.log(newCampGround);
    // Create and save to the DB
    Campground.create(newCampGround, (err, newlyCreatedCamp) => {
        if (err) {
            console.log(err);
        } else {
            console.log(newCampGround);
            res.redirect('/');
        }
    })

});

//SHOW show details about one item MUST BE AFTER !!!NEW route
router.get('/:id', (req, res) => {

    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampGround) {
        if (err) {
            console.log(err);
        } else {

            res.render('campgrounds/show.ejs', { campground: foundCampGround });
        }
    });

});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports=router;

