"use strict"

const express=require('express');
const bodyParser=require('body-parser');
const router=express.Router();
const expressSanitizer=require('express-sanitizer');
const Campground=require('../models/campground');

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
//EDIT
router.get('/:id/edit',(req,res)=>{
    Campground.findById(req.params.id,(err,editCampground)=>{
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.render('campgrounds/edit',{campground:editCampground});
        }
    })
});


//UPDATE
router.put('/:id',(req,res)=>{
let dataToUpdate={
    name:req.body.name,
    image:req.body.image,
    description:req.body.description
}
   Campground.findByIdAndUpdate(req.params.id,dataToUpdate,(err,updatedCamp)=>{
    if(err){
        console.log(err);
        res.redirect('/campgrounds');
    }else{
        res.redirect('/campgrounds/'+req.params.id)
    }
   })
})

//DELETE
router.delete('/:id',(req,res)=>{
    Campground.findOneAndRemove(req.params.id,(err)=>{
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds');
        }
    })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports=router;

