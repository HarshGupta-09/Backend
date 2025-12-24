const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

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
        req.userId = response.id;
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

    // Hashing the password
    const hashPassword =  await bcrypt.hash(password,10);
console.log(hashPassword)
    await UserModel.create({ // to create a new document in db 'users' collection
        email : email,
        password : hashPassword,
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
        email : email,
    })
    // Comparing the user given pass with hash password stored in the db
    const passwordMatch =   bcrypt.compare(password,response.password)


    if(response && passwordMatch){
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
app.post("/todo",auth, async (req,res)=>{ 
    await TodoModel.create({
        title : req.body.title,
        
        userId : req.userId
    })
    res.json({
        userId : req.userId,
        Message : 'Posted succesfully',
    })




})
// Authenticated Route
app.get("/todo", auth, async function (req, res) {
    // Get the userId from the request object
    const userId = req.userId;

    // Find all the todos with the given userId
    const todos = await TodoModel.find({
        userId,
    });

    // Send the todos to the client
    res.json({
        todos,
    });
});



app.listen(3000,()=>{
    console.log("Server Running on PORt 3000")
})