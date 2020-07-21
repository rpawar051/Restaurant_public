const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    added_by: String,
    user_id: String,
    categories_id: String,
    subcategories_id: String,
    subsubcategories_id: String,
    brand_id: String,
    photos: String,
    thumbnail_img: String,
    featured_img: String,
    flash_deal_img: String,
    video_provider: String,
    video_link: String,
    tags: String,
    description: String,
    unit_price: Number,
    purchase_price: Number,
    choice_options: String,
    colors: String,
    quantity: String,
    variations: String,
    todays_deal: Number,
    published: Number,
    featured: Number,
    current_stock: Number,
    unit: String,

    discount: Number,
    discount_type: String,
    tax: Number,
    tax_type: String,
    shipping_type: String,
    shipping_cost: Number,
    num_of_sale: Number,
    meta_title: String,
    meta_description: String,
    meta_img: String,
    deal_of_the_day: Number,
    best_buy: Number,
    slug: String,
    pdf: String,
    rating: Number,
    warrenty: Number,
    created_at: Date,
    updated_at: Date
})

const Products = mongoose.model('Products', productSchema);
module.exports = Products;

