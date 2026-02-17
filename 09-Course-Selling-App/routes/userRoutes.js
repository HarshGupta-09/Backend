const express = require("express")
const userRouter = express.Router()
import { z } from 'zod'
import bcrypt from 'bcrypt';

userRouter.post("/signup" , (req,res)=>{
  

})

userRouter.post('/signin',(req,res)=>{

})

userRouter.get("/purchases",(req,res)=>{ // List all  purchased courses
    res.json({
        messg : "From users"
    })
    
})

module.exports = {userRouter : userRouter}