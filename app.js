const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
let port = process.env.port || 3000;


mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// SHEMA SET UP
let campGroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let CampGround = mongoose.model('Campground', campGroundSchema);

app.get('/', (req, res) => {
    res.render('lending');
});

//Index rout show all campgrounds
app.get('/campgrounds', (req, res) => {
    //   get all campground from db
    CampGround.find({}, (err, allCampgrounds) => {
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
    console.log(name);
    let image = req.body.image;
    console.log(image);
    let description = req.body.description;
    console.log(description);

    let newCampGround = { name: name, image: image, description: description };
    console.log(newCampGround);
    // Create and save to the DB
    CampGround.create(newCampGround, (err, newlyCreatedCamp) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    })

});

//SHOW show details about one item MUST BE AFTER !!!NEW route
app.get('/campgrounds/:id', (req, res) => {
   
    CampGround.findById(req.params.id,function(err,foundCampGround){
        if(err){
            console.log(err);
        }else{
           
            res.render('show.ejs',{campground:foundCampGround});
        }
    });    

});

app.listen(port, () => {
    console.log('Yelp Camp is listening on port:' + port)
});