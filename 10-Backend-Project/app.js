const express = require("express")
const app = express();
const userModel = require("./models/user");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt")


app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cookieParser())


app.get('/',(req,res)=>{
  res.render("index")
})

app.post('/register',async (req,res)=>{
  const {username , name , email , age , password} = req.body;
   let user = await userModel.findOne({email:email})
   if(user){
 return    res.status(401).json({
      message : "user with this email already exist"
    })
   }
   bcrypt.hash(password,10)


  userModel.create({

    
  })
})






app.listen(3000,()=>{
    console.log("server running")
})