const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground.js'),
    seedDb = require('./seeds.js');


seedDb();
const app = express();
let port = process.env.port || 3000;

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

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
            res.render('index', { campgrounds: allCampgrounds });
        }

    })

});

//NEW - show form to create new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('new.ejs');
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

            res.render('show.ejs', { campground: foundCampGround });
        }
    });

});

app.listen(port, () => {
    console.log('Yelp Camp is listening on port:' + port)
});