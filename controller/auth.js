const User = require("../modal/User");
const bcrypt = require('bcrypt');

const Joi = require('joi');










const login=async(req,res,next)=>{
  try{
    let email = req.body.email;
    let password=req.body.password;
    let user =await User.findOne({email})
    if(!user){
      return res.status(401).send( "Email does not exist");
    }
    let  validPassword = await bcrypt.compare(password,user.password)
    if(validPassword){
        //create token
        res.send("Login Successful");
    }else{
       return res.status(401).send("Wrong Password")
    }
    }catch(err){
    next(err);
  }
  }
  
  


const signupValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().min(3).max(30).required(),
  password: Joi.string().min(3).max(30).required(),
})

const signup = async (req, res, next) => {
  try {
    const value = await signupValidationSchema.validateAsync(req.body, {
      allowUnknown: true,
      abortEarly: false
    })
  } catch (err) {
    return res.status(400).send({
      msg: "validation error",
      error: err.details.map(el => {
        return{ 
           field: el.context.key,
          msg: el.message
        }
      
      })
    })
  }
  try {

    let userExist=await User.findOne({email : req.body.email});
    if(userExist){
      return res.status(400).send("Email Already Exits.")
 }
    

    let hashed = await bcrypt.hash(req.body.password, 10);
    let user = await User.create({ ...req.body, password: hashed });
    user.password=undefined;
    res.send(user);
  }
  catch (err) {
    next(err)
  };



}

module.exports = {
  signup,
  login
}