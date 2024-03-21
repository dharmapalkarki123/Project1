const express=require('express');
const router=express.Router();
const { 
  fetchProduct, 
  storeProduct ,
  updateProduct,
  deleteProduct
} = require('../controller/product');
const { checkAuthentication,isSeller } = require('../middleware/auth');



// function checkAuthentication (req,res,next){
//   console.log(req.header);
// }
// router.get("")
router.get( "", fetchProduct)
router.post("",checkAuthentication,isSeller,storeProduct)
router.put("", updateProduct)
router.delete( "/:_id",deleteProduct)
// router.post(":_id", UpdateProduct)
// router.post("_id", DeleteProduct)

module.exports = router;