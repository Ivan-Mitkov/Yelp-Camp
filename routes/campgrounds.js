"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const expressSanitizer = require('express-sanitizer');
const Campground = require('../models/campground');
const middleware=require('../middleware/index.js');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(expressSanitizer());//must be after body parser
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
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('campgrounds/new.ejs');
});

//CREATE rout add new campground to th DB
router.post('/', middleware.isLoggedIn, (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampGround = { name: name, image: image, description: description, author: author };
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
        if (err||!foundCampGround) {
            req.flash('error','Campground not found');
            console.log(err);
            res.redirect('back');
        }else {

            res.render('campgrounds/show.ejs', { campground: foundCampGround });
        }
    });

});
//EDIT
router.get('/:id/edit', middleware.checkCampOwnership, (req, res) => {    
    Campground.findById(req.params.id, (err, editCampground) => {
        if (err||!editCampground) {
            req.flash('error','Campground not found');
            console.log(err);
            res.redirect('back');
        }else{
            res.render('campgrounds/edit', { campground: editCampground });
        }
        
    });

});


//UPDATE
router.put('/:id',middleware.checkCampOwnership, (req, res) => {
    let dataToUpdate = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    }
    Campground.findByIdAndUpdate(req.params.id, dataToUpdate, (err, updatedCamp) => {
        if (err||!updatedCamp) {
            console.log(err);
            req.flash('error','Campground not found')
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id)
        }
    })
})

//DELETE
router.delete('/:id',middleware.checkCampOwnership, (req, res) => {
    Campground.findOneAndRemove(req.params.id, (err,foundCamp) => {
        if (err||!foundCamp) {
            console.log(err);
            req.flash('error','Campground not found')
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login');
// }

// function checkCampOwnership(req, res, next) {
//     //is user logged in?
//     if (req.isAuthenticated()) {
//         Campground.findById(req.params.id, (err, editCampground) => {
//             if (err) {
//                 res.redirect('back');
//             } else {
//                 //does user own campground
//                 if (editCampground.author.id.equals(req.user._id)) {
//                    // run code below
//                     next();
//                 } else {
//                     //if not redirect
//                     res.redirect('back');
//                 }
//             }
//         })
//     } else {
//         //redirect from where he came
//         res.redirect('/login');
//     }
// }

module.exports = router;

