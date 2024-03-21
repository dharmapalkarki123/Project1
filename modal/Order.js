const { string } = require('joi');
const { BUYER, SELLER } = require("../constant/role");


const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId =Schema.ObjectId
const OrderSchema = new Schema({
  products:[
    // {
    //   _id:ObjectId,
    //   price:{
    //     type:Number,
    //     require:true,
    //   },
    //   name:{
    //     type:String,
    //     required:true,
    //   },
    //   quantity:Number,
    // },
{
  _id:ObjectId,
  price:Number,
  name:String,
  quantity:Number,
}
],
});
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order