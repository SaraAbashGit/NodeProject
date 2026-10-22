const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User=require('../models/userModel')
const Order=require('../models/orderModel')
const bcrypt=require('bcrypt')




    const getAllorders = async(req, res) => {
     try {
             const orders = await Order.find();  // Store the result in a variable
     
             if (!orders || orders.length === 0) {  // Check if users array is empty
                 return res.status(404).json({"message": "no orders found"});
             }
             
             res.json(orders);  // Respond with the list of users
         } catch (error) {
             console.error(error);
             res.status(500).json({ message: "An error occurred while retrieving orders" });
         }
    };

const CreateNewOrder = async(req, res) => {
 try {     
        const { email,productsId,quantity,finalPrice } = req.body;
              
        if (quantity===undefined || !email||!productsId||!finalPrice ) {
            return res.status(401).send({ "message": "quaninty,orddate,status are required " });
        }

 const lastOrder = await Order.findOne().sort({ orderId: -1 }).exec();  
   const newOrderId = lastOrder ? Number(lastOrder.orderId) + 1 : 1;

        const NewOrder = new Order({
            orderId:newOrderId,
            productsId:productsId,
            email:email,
            quantity:quantity,
            finalPrice:finalPrice 
        });
        
        await NewOrder.save();
        res.json(NewOrder)
              
    } catch (error) { 
        console.log(error);
        res.status(500).json({ message: "failed to create new order" });
        
    }
   
  };
    const getOrder = async(req, res) => {
      const id = req.params.id; 
      const order = await Order.findById(id).exec();
    console.log("Requested ID:", id);
  
      if (!order) {
        return res.status(404).json({ message: `No user found with ID ${req.params.id}` });
      }
    
      res.json(order);
    };

  module.exports={
    CreateNewOrder,
    getAllorders,
    getOrder
  }
  




  
  