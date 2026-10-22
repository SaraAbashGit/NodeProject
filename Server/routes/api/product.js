const express=require('express')
const router=express.Router();



const productsController=require('../../controllers/prodCon')

router.route('/')
.get(productsController.getAlluproduct)
.post(productsController.CreateNewProduct)
.put(productsController.updateProduct)
.delete(productsController.deleteProduct)

router.route('/:id')
.get(productsController.getProduct)

module.exports=router;