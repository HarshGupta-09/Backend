const express = require("express")
const jwt = require("jsonwebtoken")

const mongoose = require('mongoose')
const app = express();

const { UserModel, TodoModel } = require("./db");

const JWT_SecretKey = "shkruksdharshti"

// Connecting Db
mongoose.connect("mongodb+srv://harshgupta82003_db_user:lwvNVO8ejjw5U4H0@cluster0.lsomcj4.mongodb.net/todo-Harsh")


// Middlewares
app.use(express.json())

function auth (req,res,next) {
    const token = req.headers.authorization;

    const response = jwt.verify(token , JWT_SecretKey);

    if(response){
        req.userId = token.id;
        next();

    }else{
        res.status(403).json({
            message : "invalid username or pass"
        })
    }
}


// Routes

app.post("/signup",async (req,res)=>{
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    await UserModel.create({ // to create a new document in db 'users' collection
        email : email,
        password : password,
        name : name

    });
    res.json({
        message : "You are singed Up"
    })

})

app.post("/signin",async (req,res)=>{
       
    const password = req.body.password;
    const email = req.body.email;

    const response = await UserModel.findOne({
        email : email, password : password
    })
    if(response){
        const token = jwt.sign({
            id : response._id.toString()
        },JWT_SecretKey) 
        res.json({
            token
        })

    }else{
        res.status(403).json({
            message : "invalid email or password"
        })
    }





})
// Authenticated Route
app.post("/todo",auth,(req,res)=>{ 

    const token = req


})
// Authenticated Route
app.get("/todos",auth,(req,res)=>{

})


app.listen(3000,()=>{
    console.log("Server Running on PORt 3000")
})