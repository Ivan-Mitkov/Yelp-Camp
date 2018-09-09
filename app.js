const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground.js'),
    Comment = require('./models/comment.js'),
    passport = require('passport'),
    User = require('./models/user.js'),
    LocalStrategy = require('passport-local'),
    seedDb = require('./seeds.js');



const app = express();
let port = process.env.port || 3000;

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

seedDb();

// configure authentication

app.use(require('express-session')({
    secret:'Nkjdskydjshfdkshfjsdfhds',
    resave:false,
    saveUninitialized:false

}));
// the credentials used to authenticate a user will only be transmitted during
// the login request. If authentication succeeds, a session will be established and maintained 
//via a cookie set in the user's browser.
// Each subsequent request will not contain credentials, 
//but rather the unique cookie that identifies the session. 
//In order to support login sessions, Passport will serialize and deserialize user instances
// to and from the session.
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//auth login  come from passpor-local-mongoose
passport.use(new LocalStrategy(User.authenticate('local')));



//==========
app.get('/', (req, res) => {
    res.render('lending');
});

//Index rout show all campgrounds
app.get('/campgrounds', (req, res) => {
    //   get all campground from db
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log('Error retrieving campgrounds');
        } else {
            res.render('campgrounds/index', { campgrounds: allCampgrounds });
        }

    })

});

//NEW - show form to create new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new.ejs');
});

//CREATE rout add new campground to th DB
app.post('/campgrounds', (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;

    let newCampGround = { name: name, image: image, description: description };
    console.log(newCampGround);
    // Create and save to the DB
    Campground.create(newCampGround, (err, newlyCreatedCamp) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    })

});

//SHOW show details about one item MUST BE AFTER !!!NEW route
app.get('/campgrounds/:id', (req, res) => {

    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampGround) {
        if (err) {
            console.log(err);
        } else {

            res.render('campgrounds/show.ejs', { campground: foundCampGround });
        }
    });

});

//======================
//COMMENTS ROUTES
app.get('/campgrounds/:id/comments/new', (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            res.render('comments/new');
        } else {
            res.render('comments/new', { campground: campground });
        }
    });
});
app.post('/campgrounds/:id/comments', (req, res) => {
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

//=====================

app.listen(port, () => {
    console.log('Yelp Camp is listening on port:' + port)
});