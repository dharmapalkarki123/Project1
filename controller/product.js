const path = require("path")
const Product = require("../modal/Product");
const { login } = require("./auth");
const Joi = require('joi');
const fs = require("fs")
// const path = require("path")

const fetchProduct = async (req, res) => {
  let sort =req.query.sort ||"dateDesc";
  let sortBy={
    createdAt:-1,
  };
  if(sort=="priceAsc"){
    sortBy={price:1};
  }else if(sort =="priceDesc"){
    sortBy={price:-1};
  }
  let product = await Product.find({
    title: new RegExp(req.query.search, "i"),
  })
  //.populate("createdBy")
  .sort(sortBy)
  res.send(product)
}
const storeProductValidationSchema = Joi.object({
image: Joi.object({
  size: Joi.number().max(2*1024*1024)
  .messages({
    "number.max":"file must be less then 100kb"
  }),
  mimetype: Joi.string().valid(
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg",
    "image/webp"
    ),
}),
  title: Joi.required(),
})




const storeProduct = async (req, res, next) => {
  
  try {
    await storeProductValidationSchema.validateAsync({ ...req.body,...req.files },
      {
        allowUnknown: true,
        abortEarly: false,
      }
    )
  } catch (err) {
    return  res.status(400).send({
      msg: "validation error",
      errors: err.details.map((el) => {
        return {
          field: el.context.key,
          msg: el.message,
        }; 
      }),
    })
  }





  try {
    let imagePath = null;

    if (req.files.image) {
      let rootPath = path.resolve();
      let uniqueTimestap = Date.now() + Math.floor(Math.random() * 1000);

      imagePath = path.join(
        '/',
        "uploads",
        ` ${uniqueTimestap}-${req.files.image.name}`
      ).replaceAll("\\", "/");
      req.files.image.mv(path.join(rootPath, imagePath));
    }






    let product = await Product.create({
      ...req.body,
      image: imagePath,
      createdBy: req.user._id,
    });
    res.send(product);
  } catch (err) {
    next(err)
  }
}


const updateProduct = async (req, res) => {

  res.send("{$req.params._id} product updated");
}
const deleteProduct = async (req, res, next   ) => {
  try{
let matched =await Product.findById(req.params._id);
if(!matched){
  let error=new Error()
  error.statusCode=404;
  error.msg="Not found"
  throw error;
  res.status(400).send()
}


    let product=await Product.findByIdAndDelete(req.params._id)
    //let product=await Product.deleteOne({_id:req.params._id})
    fs.unlinkSync(path.join(path.resolve(),product.image))
    res.send("Product deleted");
} catch(err){
next(err)
}
}
module.exports = {
  fetchProduct,
  storeProduct,
  updateProduct,
  deleteProduct
}