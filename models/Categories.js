const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    name: String,
    banner: String,
    icon: String,
    featured: Number,
    top: Number,
    slug: String,
    meta_title: String,
    meta_description: String,
    created_at: Date,
    updated_at: Date,
    ids: Number
})

const Categories = mongoose.model('Categories', categoriesSchema);
module.exports = Categories;

