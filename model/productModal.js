// models/Product.js (Schema definition)
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  brand: String,
  algorithm: String,
  coin: [String],
  mrp: String,
  sellPrice: String,
  productType: String,
  power: String,
  hashRate: String,
  overview: String,
  description: String,
  status:String,
  descriptionImage:{type:String,default:null},
  productImages:{type:Array,default:[]},// ✅ Add slug field
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
   altText: String,


});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
