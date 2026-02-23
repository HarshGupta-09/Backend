const express = require("express")
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cookieParser())


app.get('/',(req,res)=>{
  res.render("index")
})
app.get('/login',(req,res)=>{
  res.render("login")
})
app.post('/register',async (req,res)=>{
  const {username , name , email , age , password} = req.body;
  
   let exist = await userModel.findOne({email:email})
   if(exist){
 return    res.status(400).json({
      message : "user with this email already exist"
    })
   }
  const hashPassword =  await bcrypt.hash(password,10)
 


 let user =  await  userModel.create({
    email : email,
    password : hashPassword,
    username : username,
    age : age,
    name : name,
    
  })
  let token = jwt.sign({
    email : email, userId : user._id
  },"SUPER_SECRET-KEY")
  res.cookie("token",token)
  res.send("registered")
})

app.post('/login',async (req,res)=>{
  const { email , password} = req.body;

  const user = await userModel.findOne({email})
  if(!user){
    return res.status(404).json({
      message : "user not found with this email"
    })
  }
  
  let ismatch = bcrypt.compare(password,user.password)
  if(!ismatch){
return  res.status(401).json({
  mesage : "invalid password"
})
  }
 
  let token = jwt.sign({
    email : email, userId : user._id
  },"SUPER_SECRET-KEY")
  res.cookie("token",token)
  res.send("logged In")
})




app.listen(3000,()=>{
    console.log("server running")
})