const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId =  Schema.ObjectId;
const ProductSchema = new Schema({
  inStock:{
      type:Number,
      default:0,
  },
title: { 
    type: String, 
    required: true,
  minLength:3, 
},
description:{
  type :String,
  maxLength:255,
},
  price: { 
    type: Number , 
    default:0
  },
  createdBy:{
    type:ObjectId,
    ref:"User",
    required:true
  },
  image:{
    type:String, 
  }
},
{
  timestamps:true,
}
);


const Product = mongoose.model("Product", ProductSchema);
module.exports = Product