const { string } = require('joi');
const { BUYER, SELLER } = require("../constant/role");


const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    // custom validation --check email here..
    validate:{
      validator:async(value)=>{
        let matched = await mongoose.models.User.findOne({email:value})
        if (matched){
          return false;
        }
      },
      msg:"Email Already used"
    },
  },
  phone:Number,
  password:{
    type: String,
    required: true
  },
  role:{
    type:String,
    enum:[BUYER,SELLER],
    required:true,
    set:(value)=>{
      console.log(value);
      return value.toLowerCase()

    }
  }
});
const User = mongoose.model("User", UserSchema);
module.exports = User