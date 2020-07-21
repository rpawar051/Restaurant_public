const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: String,
    city: String,
    image0: String,
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,
    image6: String,
    image7: String,
    image8: String,
    image9: String,
    image10: String,
    image11: String
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;

