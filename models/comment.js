const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/yelp_camp");


// SHEMA SET UP
let commentSchema = new mongoose.Schema({
    text: String,
    author: String    
});

module.exports = mongoose.model('Comment', commentSchema);