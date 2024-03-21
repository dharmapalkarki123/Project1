const Order =require("../modal/Order")
const Joi = require("joi")

const storeOrderValidationSchema= Joi.object({
  products:Joi.array()
  .items({
    _id:Joi.required(),
    quantity:Joi.number().min(1).required(),
  })
  .min(1)
  .required(),
})






const createOrder = async(req,res,next)=>{
try{
  await storeOrderValidationSchema.validateAsync(req.body,{
    allowUnkown:true,
    abortEarly:false,
  });
} catch(err){
  return res.status(400).send({
    msg:"validation error",
    errors:err.details.map((el)=>{
      return{
        field:el.context.key,
        msg:el.message,
      }
    }),
  })
}
try{
  let products=[]
  let order =await Order.create({
    products:products,
  });
  res.send(order);
} catch(err){
  next(err);
}
}; 
module.exports={
createOrder,
};