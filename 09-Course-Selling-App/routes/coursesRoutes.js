const express = require("express")
const coursesRoutes = express.Router()
import { z } from 'zod'
import bcrypt from 'bcrypt';

coursesRoutes.get("/preview",(req,res)=>{ // For listing all the courses 
    res.json({
        messg : "From courses"
    })
    
})




coursesRoutes.post("/purchase",(req,res)=>{ // To purchase a course
    
})

module.exports = {
    coursesRoutes : coursesRoutes
}