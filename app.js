"use strict"
const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    flash=require('connect-flash'),//must come before passport configuration
    Campground = require('./models/campground.js'),
    Comment = require('./models/comment.js'),
    passport = require('passport'),
    User = require('./models/user.js'),
    LocalStrategy = require('passport-local'),
    methodOverride=require('method-override'),
    seedDb = require('./seeds.js');

const commentRoutes = require('./routes/comments.js'),
    authRoutes = require('./routes/auth.js'),
    campgroundRoutes = require('./routes/campgrounds.js');


const app = express();
let port = process.env.PORT || 3000;
// let url = process.env.DATABASEURL||"mongodb://localhost/yelp_camp";
// mongodb://ivan:YelpCamp1@ds161939.mlab.com:61939/hut
const url ="mongodb://ivan:YelpCamp1@ds161939.mlab.com:61939/hut";

//password YelpCamp1
//wich promise library we use ES6
mongoose.Promise = global.Promise;

mongoose.connect(url,{
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');


// seedDb();

// configure authentication

app.use(require('express-session')({
    secret: 'Nkjdskydjshfdkshfjsdfhds',
    resave: false,
    saveUninitialized: false

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

//passing object to every route
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    //adding flash message to partials - if it's in login router it will not work 
    //vzimame REQ.flash i go assignvame na res.locals
    res.locals.error=req.flash('error');
    res.locals.success=req.flash('success');
    next();
});

//using routes
app.use(authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(port,process.env.IP, () => {
    console.log('Yelp Camp is listening on port:' + port)
});