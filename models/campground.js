
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/yelp_camp");


// SHEMA SET UP
let campGroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ]
});

module.exports = mongoose.model('Campground', campGroundSchema);