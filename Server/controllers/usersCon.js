const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User=require('../models/userModel')
const Order=require('../models/orderModel')
const bcrypt=require('bcrypt')



  

  const getAllusers = async (req, res) => {
    try {
        const users = await User.find();  // Store the result in a variable

        if (!users || users.length === 0) {  // Check if users array is empty
            return res.status(404).json({"message": "no users found"});
        }
        
        res.json(users);  // Respond with the list of users
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "An error occurred while retrieving users" });
    }
};
 
  const CreateNewUser = async (req, res) => {
    try {     
        const { fullname, address
          , roles,phone, email, password } = req.body;

        if (!fullname || !address || !phone) {
            return res.status(401).json({ "message": "fullname, address, phone are required " });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        const Newuser = new User({
            fullname: fullname,
            address: address, 
            roles: roles,                     
            phone: phone,        
            email: email,
            password: hashedPassword
        });
        
        await Newuser.save();

        const token = generateToken(fullname, address, roles, phone, email, password);
        
        res.status(201).json({
            message: 'User created successfully',
            token: token,
            user: Newuser
        }); 
              
    } catch (error) { 
        console.log(error);
        res.status(500).json({ message: "failed to create new user" });
        
    }
};

  const generateToken=(fullname, address, roles, phone, email, password) => {
     const payload={fullname, address, roles, phone, email, password};
     const token=jwt.sign(payload,process.env.SECRET_KEY)
     return token;
  }
 
  

  const updateUser = async (req, res) => {
  try {
    if (!req.body._id)
      return res.status(400).json({ message: "ID is required" });

    const user = await User.findById(req.body._id).exec();

    if (!user) {
      return res.status(404).json({ message: `User ID ${req.body._id} not found` });
    }

    if (req.body.fullname !== undefined) user.fullname = req.body.fullname;
    if (req.body.phone !== undefined) user.phone = req.body.phone;
    if (req.body.address !== undefined) user.address = req.body.address;
    if (req.body.email !== undefined) user.email = req.body.email;
    if (req.body.roles !== undefined) user.roles = req.body.roles;
    
    const result = await user.save();
    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update user" });
  }
};

  const deleteUser = async(req, res) => {
        try{
          if(!req.body.password)
            return res.status(400).json({"message":"password is required"})
         
          const user = await User.findOne({ _id: req.body._id }).exec();
        if (!user) {
            return res.status(400).json({ "message": `the user id ${req.body._id} wasnt found` });
        }
       
        const result=await user.deleteOne({_id:req.body._id})
            res.json(result)
    }
    catch(err){
      console.log(err);
      res.status(400).json({"message":"failed to delete user"})

    }
  };
  
  
  const getUser = async(req, res) => {
    const id = req.params.id; 
    const user = await User.findById(id).exec();
  

    if (!user) {
      return res.status(404).json({ message: `No user found with ID ${req.params.id}` });
    }
  
    res.json(user);
  };
  
  module.exports = {
    getAllusers,
    CreateNewUser,
    updateUser,
    deleteUser,
    getUser
  };