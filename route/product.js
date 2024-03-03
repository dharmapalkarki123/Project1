const express=require('express');
const router=express.Router();
const { fetchProduct, storeProduct ,updateProduct,deleteProduct} = require('../controller/product');


// router.get("")
router.get( "",fetchProduct)
router.post( "",storeProduct)
router.put( "",updateProduct)
router.delete( "",deleteProduct)
// router.post(":_id", UpdateProduct)
// router.post("_id", DeleteProduct)

module.exports = router