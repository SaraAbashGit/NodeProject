const express=require('express')
const router=express.Router();



const usersController=require('../../controllers/usersCon')

router.route('/')
.get(usersController.getAllusers)
.post(usersController.CreateNewUser)
.put(usersController.updateUser)
.delete(usersController.deleteUser)

router.route('/:id')
.get(usersController.getUser)

module.exports=  router;
