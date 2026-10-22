const mongoose=require('mongoose')
const orderSchema = new mongoose.Schema({
  
  orderId: {
    type: Number,
    required: true,
    unique: true
  },

    email: {
      type:String,
      required: true,
    },

   finalPrice: {
    type: Number,
    required: false  // אפשר גם להגדיר default אם בא לך
  },
    productsId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],

    quantity: {
      type: Number,
      required: true
    },

    orderDate: {
      type: Date,
      default: Date.now
    },

    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled','done'],
      default: 'pending'
    }

  });

  module.exports = mongoose.model('Order', orderSchema);