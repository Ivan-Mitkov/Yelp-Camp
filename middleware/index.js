let middleware = {};

const Campground = require('../models/campground');
const Comment = require('../models/comment');

middleware.checkCampOwnership = function (req, res, next) {
    //is user logged in?
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, editCampground) => {
            if (err) {
                res.redirect('back');
            } else {
                //does user own campground
                if (editCampground.author.id.equals(req.user._id)) {
                    // run code below
                    next();
                } else {
                    //if not redirect
                    res.redirect('back');
                }
            }
        })
    } else {
        //redirect from where he came
        res.redirect('/login');
    }

}
middleware.checkCommentOwnership = (req, res, next) => {
    //is user logged in?
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, editComment) => {
            if (err) {
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
        //redirect from where he came
        res.redirect('/login');
    }
}
middleware.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please login first');
    res.redirect('/login');

}

module.exports = middleware;