const express = require("express")
const userRouter = express.Router()


userRouter.post("/signup" , (req,res)=>{
    const password = req.password;
    const email = req.email;

})

userRouter.post('/signin',(req,res)=>{

})

userRouter.get("/purchases",(req,res)=>{ // List all  purchased courses
    res.json({
        messg : "From users"
    })
    
})

module.exports = {userRouter : userRouter}