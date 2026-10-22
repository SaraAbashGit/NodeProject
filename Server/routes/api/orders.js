const express=require('express')
const router=express.Router();



const ordersController=require('../../controllers/ordersCon ')

router.route('/')
.get(ordersController.getAllorders)
.post(ordersController.CreateNewOrder)


router.route('/:id')
.get(ordersController.getOrder)

module.exports=  router;
