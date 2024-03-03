const { string } = require('joi');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true
  },
  phone:Number,
  password:{
    type: String,
    required: true
  },
});
const User = mongoose.model("User", UserSchema);
module.exports = User