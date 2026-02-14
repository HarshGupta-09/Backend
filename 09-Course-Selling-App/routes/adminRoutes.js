const express = require("express")
const adminRoutes = express.Router()


adminRoutes.post("/signup" , (req,res)=>{

})

adminRoutes.post('/signin',(req,res)=>{

})

adminRoutes.post("/course",(req,res)=>{
    // To add a course
})


adminRoutes.put("/course",(req,res)=>{ 
    // To update  any course
})


adminRoutes.get("/course/bulk",(req,res)=>{
    // Give me all the course that i have created
})







module.exports = {
    adminRoutes : adminRoutes
}