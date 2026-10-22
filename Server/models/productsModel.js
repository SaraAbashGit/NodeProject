 const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId:{
  type: String,
 required: true,
  unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: false
  },
  stock: {
    type: Number,
    default: 50
  }
});

module.exports = mongoose.model('Product', productSchema);