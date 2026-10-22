
const mongoose=require('mongoose');

const userSchema = new mongoose.Schema(
{
  
  fullname:{
    type :String ,
    required:true 
  },
  address:{
    type :String ,
    required:true 
  },
  
  roles: {
    type: String, // Single role field
    enum: ['admin', 'user'], // Define possible roles
    default: 'user' // Default role if not specified
},
  phone:{
    type: String,
    required:true,
    unique: true
  },
  email:{
    type :String ,
    required:true,
    unique: true
  },
 password:{
    type :String ,
    required:true
  },
}

)

module.exports =mongoose.model('User',userSchema)