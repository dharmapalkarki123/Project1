const { string } = require('joi');
const { BUYER, SELLER } = require("../constant/role");

const Product = require("./Product")
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId =Schema.ObjectId
const OrderSchema = new Schema({
  products:[
    {
      _id:ObjectId,
      price:{
        type:Number,
        require:true,
      },
      title:{
        type:String,
        required:true,
      },
      quantity:Number,
    },
// {
//   _id:ObjectId,
//   price:Number,
//   name:String,
//   quantity:Number,
// }
],
});
OrderSchema.post("save",function(){
  let order = this;
  let orderProducts=order.products;
orderProducts.forEach(async(el)=>{
  await Product.findByIdAndUpdate(el._id, {
    $inc:{instock: -el.quantity},
  })
})
})



const Order = mongoose.model("Order", OrderSchema);
module.exports = Order