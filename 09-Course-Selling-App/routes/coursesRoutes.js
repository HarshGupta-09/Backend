const express = require("express")
const coursesRoutes = express.Router()
import { z } from 'zod'
import bcrypt from 'bcrypt';
import { courseModel } from '../db';

coursesRoutes.get("/preview",async (req,res)=>{ // For listing all the courses 
  const courses = await courseModel.find({});
  res.json({
    courses
  })
    
})




coursesRoutes.post("/purchase",async (req,res)=>{ // To purchase a course
    
const userId = req.userId;
    const courseId = req.body.courseId;

    // should check that the user has actually paid the price
    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message: "You have successfully bought the course"
    })
})

module.exports = {
    coursesRoutes : coursesRoutes
}