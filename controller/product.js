  const Product=require("../modal/Product");
  
  const fetchProduct =async(req,res)=>{
  let product=await Product.find()
  res.send(product)
}
const storeProduct= async (req,res) => {
  let product=await Product.create(req.body)
  res.send(product);
}
const updateProduct= async (req,res) => {
  
  res.send("{$req.params._id} product updated");
}
const deleteProduct= async (req,res) => {
  
  res.send("Delete Product");
}
  module.exports= {
    fetchProduct,
    storeProduct,
    updateProduct,
    deleteProduct}