const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subCategoriesSchema = new Schema({
    name: String,
    categories_id: String,
    slug: String,
    meta_title: String,
    meta_description: String,
    created_at: Date,
    updated_at: Date
})

const SubCategories = mongoose.model('SubCategories', subCategoriesSchema);
module.exports = SubCategories;

