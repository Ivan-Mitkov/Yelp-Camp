"use strict"
const express = require('express');
//mergeParams=true so we can use :id when shorten the path in router
const router = express.Router({ mergeParams: true });

const Campground = require('../models/campground');
const Comment = require('../models/comment');

const middleware=require('../middleware/index.js');


// /campgrounds/:id/comments/:comment_id/edit
//======================
//COMMENTS ROUTES
router.get('/new', middleware.isLoggedIn, (req, res) => {
    console.log(req.params.id);
    Campground.findById(req.params.id, (err, campground) => {
        if (err||!campground) {
            req.flash('error','Comment not found');
            res.render('comments/new');
        } else {
            res.render('comments/new', { campground: campground });
        }
    });
});
router.post('/', middleware.isLoggedIn, (req, res) => {
    //lookup campground using id
    Campground.findById(req.params.id, (err, camp) => {
        if (err) {
            res.redirect('/campgrounds/:id/comments/new');
        } else {
            //create new comment
            Comment.create(req.body.comment, (err, newComment) => {
                if (err) {
                    console.log(err);
                    req.flash('error', 'Something went wrong')
                } else {
                    //add username and id to comment 
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    console.log(newComment);
                    //save comment
                    newComment.save();
                    //connect new comment to campground
                    camp.comments.push(newComment);
                    //save the campground
                    camp.save();
                    req.flash('success', 'Comment added')
                    //redirect to campground show page
                    res.redirect(`/campgrounds/${camp._id}`);
                }
            })


        }
    });

});
//EDIT routes
router.get('/:comment_id/edit',middleware.checkCommentOwnership, (req, res) => {
    //error checking for camp
    Campground.findById(req.params.id,(err,foundCamp)=>{
        if(err||!foundCamp){
            req.flash('error','Camp not found');
            return res.redirect('back');
        }
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err||!foundComment) {
                console.log(err);
                req.flash('error','Comment not found');
                res.redirect('back');
            } else {
                res.render('comments/edit', { campground_id: req.params.id, comment: foundComment });
            }
        });
    });   

});
// UPDATE
router.put('/:comment_id',middleware.checkCommentOwnership, (req, res) => {
    //find the comment 1 arg then replace with 2 arg
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, commentToUpdate) => {
        if (err||!commentToUpdate) {
            console.log(err);
            req.flash('error','Comment not found');
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id)
        }
    })

});
//DELETE
router.delete('/:comment_id',middleware.checkCommentOwnership,(req,res)=>{
    Comment.findOneAndRemove(req.params.comment_id,(err,commentToDelete)=>{
        if(err||!commentToDelete){
            req.flash('error','Comment not found');
            res.redirect('back');
        }else{
            req.flash('success','Comment deleted')
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login');
// }
// function checkCommentOwnership(req, res, next) {
//     //is user logged in?
//     if (req.isAuthenticated()) {
//         Comment.findById(req.params.comment_id, (err, editComment) => {
//             if (err) {
//                 res.redirect('back');
//             } else {
//                 //does user own comment
//                 if (editComment.author.id.equals(req.user._id)) {
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
