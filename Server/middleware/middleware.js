
//middleware use to check the req before we send the answer/res
//there are build in functions when we use express like:
//1 express.json()   ----  this check if the file is jso and parse it to json
//2 express.static() ---- this is good for images,css pages for static files
//3 express.urlencoded() ---- this is when you get details from page of html and you want to get the name 
//and so on you use it
//4 express.Router() --- it helps with routs when you have user and on the user there are som actions 
//you can make special router for all




 const express = require('express');
 const app = express();
// //3
 app.use(express.urlencoded({ extended: true }));
//2
 app.use('/',express.static('public'));
// //1
 app.use(express.json());

 const jwt=require('jsonwebtoken')

  const VerifyToken=(token)=>{
    try{
      const decodedToken=jwt.verify(token,process.env.SECRET_KEY)
      return decodedToken;
    }
    catch{
    return null;
    }
  }

const decodedToken=(token)=>{
  const decoded=jwt.verify(token,process.env.SECRET_KEY);
  const {name,email,password}=decoded;
  return {name,email,password};
}



const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // הטוקן צריך להגיע בצורת: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // נשמור את פרטי המשתמש להמשך
    next(); // ממשיכים לראוט הבא
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};




  
module.exports={VerifyToken,decodedToken,authenticateToken};

