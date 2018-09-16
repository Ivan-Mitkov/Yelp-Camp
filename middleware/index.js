let middleware = {};

const Campground = require('../models/campground');
const Comment = require('../models/comment');

middleware.checkCampOwnership = function (req, res, next) {
    //is user logged in?
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, editCampground) => {
            if (err||!editCampground) {
                req.flash('error', 'Campground not found');
                res.redirect('back');
            } else {
                //does user own campground
                if (editCampground.author.id.equals(req.user._id)) {
                    // run code below
                    next();
                } else {
                    req.flash('error', 'You don\'t have permission to do that');
                    //if not redirect
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error', 'You need to be logged in to do that');
        //redirect from where he came
        res.redirect('/login');
    }

}
middleware.checkCommentOwnership = (req, res, next) => {
    //is user logged in?
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, editComment) => {
            if (err||!editComment){
                req.flash('error', 'Comment not found');
                res.redirect('back');
            } else {
                //does user own comment
                if (editComment.author.id.equals(req.user._id)) {
                    // run code below
                    next();
                } else {
                    //if not redirect
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error', 'You need to be logged in to do that');
        //redirect from where he came
        res.redirect('/login');
    }
}
middleware.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/login');

}

module.exports = middleware;