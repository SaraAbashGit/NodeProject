
const dotenv=require('dotenv')
const fs=require('fs');
const path=require('path');
const express=require('express');
const cors=require('cors');
// const corsOptions=require('./config/corsOptions');
const Order = require('./models/orderModel');
const cookieParser=require('cookie-parser')
const app=express();
const mongoose=require('mongoose');
dotenv.config()
mongoose.connect(process.env.DB_CONNECT)
.then(()=>{
  console.log('connected to mongoDB'); 
}).catch((err)=>console.log(err));


// mongoose.connect(process.env.DB_CONNECT)
//   .then(async () => {
//     await Order.collection.dropIndex('userId_1');
//     console.log('Index dropped');
//     mongoose.disconnect();
//   })

//app.use(cors())
const port=process.env.Port;
const logsDirectory = path.join(__dirname, 'logs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, 'Client')));

const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://127.0.0.1:5501',
  'http://localhost:3000',
  'http://localhost:5500',
  'http://localhost:5501'
];

app.use(cors({
  origin: function (origin, callback) {
    // אם origin לא מוגדר (למשל בבדיקות), או שהוא ברשימה
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  },
  credentials: true
}));

app.use(cookieParser());
app.use('/users',require('./routes/api/users'))
app.use('/order',require('./routes/api/orders'))
app.use('/product',require('./routes/api/product'))
app.use('/login',require('./routes/api/login'))

const refreshRoute = require('./routes/api/refreshJWT');
app.use('/refresh', refreshRoute);

const Product=require('./models/productsModel')
app.put('/product/stock', async (req, res) => {
    try {
        const { _id, stock } = req.body;
        if (!_id || stock == null) {
            return res.status(400).json({ message: 'Missing product ID or stock value' });
        }

        const product = await Product.findById(_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.stock = stock;
        await product.save();
      
        res.json({ message: 'Stock updated successfully', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
app.put('/product/price/:id', async (req, res) => {
  const productId = req.params.id;
  const newPrice = req.body.price;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { price: newPrice },
      { new: true }
    );

    res.json({
      message: 'Price updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating price:', error);
    res.status(500).json({ error: 'Failed to update price' });
  }
});
 
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
const message=`request  ${req.method}  ${req.url}  ${new Date().toISOString()} \n`

fs.appendFile(path.join(logsDirectory,'req.txt'),message,(err)=>{
  if(err)
    throw err;
});

next();
});

app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  const errormessage = `error  ${err.message}   ${new Date().toISOString()} \n`;

  fs.appendFile(
    path.join(logsDirectory, 'err.txt'),
    errormessage,
    (fsErr) => {
      if (fsErr) {
        console.error('Failed to write error log:', fsErr);
      }
    }
  );

  res.status(500).send('Something went wrong!');

});


  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const errorMessage = `404 Error: Route ${req.method} ${req.url} not found ${new Date().toISOString()} \n`;
  
    // Log the 404 error in the err.txt file
    fs.appendFile(path.join(logsDirectory, 'err. '), errorMessage, (err) => {
      if (err) {
        console.error('Error writing to err.txt:', err);
      }
    });
  
    // Respond with a 404 status and a message
    res.status( ).send('Page   ot Found');
  });

  app.listen(port,()=>{
    console.log(`connected well to port ${port}`);
    })





