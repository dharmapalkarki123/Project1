const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId =  Schema.ObjectId;
const ProductSchema = new Schema({
  title: { 
    type: String, 
    required: true },
  price: { 
    type: Number , 
    default:0
  },
  createBy:{
    type:ObjectId,
    ref:"User",
    required:true
  }
})
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product