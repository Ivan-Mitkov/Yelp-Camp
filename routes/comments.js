"use strict"
const express = require('express');
//mergeParams=true so we can use :id when shorten the path in router
const router = express.Router({mergeParams:true});

const Campground = require('../models/campground');
const Comment = require('../models/comment');


//======================
//COMMENTS ROUTES
router.get('/new', isLoggedIn, (req, res) => {
    console.log(req.params.id);
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            res.render('comments/new');
        } else {
            res.render('comments/new', { campground: campground });
        }
    });
});
router.post('/', isLoggedIn, (req, res) => {
    //lookup campground using id
    Campground.findById(req.params.id, (err, camp) => {
        if (err) {
            res.redirect('/campgrounds/:id/comments/new');
        } else {
            //create new comment
            Comment.create(req.body.comment, (err, newComment) => {
                if (err) {
                    console.log(err);
                } else {
                    //add username and id to comment 
                    newComment.author.id=req.user._id;
                    newComment.author.username=req.user.username;
                    console.log(newComment);
                    //save comment
                    newComment.save();
                    //connect new comment to campground
                    camp.comments.push(newComment);
                    //save the campground
                    camp.save();
                    //redirect to campground show page
                    res.redirect(`/campgrounds/${camp._id}`);
                }
            })


        }
    });

});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
