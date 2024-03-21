const User = require("../modal/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Joi = require('joi');










const login=async(req,res)=>{
  // try{

    let user = await User.findOne({email:req.body.email}).select('+password');
    return res.send(user)
    if(user){
      let matched=await bcrypt.compare(req.body.password,user.password);
      if(matched){
        user = user.toObject();
        user.password=undefined;
        const token = jwt.sign(user,"yourSecreteSignature")
        return res.send({token,user})
    }
  }
  return res.status(401).send({
    msg: "Email or password is wrong"   
  })
}
    // }
  //   }catch(err){
  //   next(err);
  // }
  // }
  
  


const signupValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().min(3).max(30).required(),
  password: Joi.string()
  .min(8)
  .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  .required(),
  // role: Joi.string().valid("buyer","seller").required() ,
})

const signup = async (req, res, next) => {
  try {
    await signupValidationSchema.validateAsync(req.body, {
      allowUnknown: true,
      abortEarly: false,
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
//   try {

//     let userExist=await User.findOne({email : req.body.email});
//     if(userExist){
//       return res.status(400).send({ msg:"Validation error",
//         errors:[{field: "email",msg:"already used"}],
//       })
//  }
try{
    let hashed = await bcrypt.hash(req.body.password, 10);
    let user = await User.create({...req.body,password: hashed });
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