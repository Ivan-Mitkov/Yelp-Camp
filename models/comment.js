const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/yelp_camp");


// SHEMA SET UP
let commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            //need model to refer with this id
            ref:'User'
        },
        username:String
    }   
});

module.exports = mongoose.model('Comment', commentSchema);