const express = require("express")
const adminRoutes = express.Router()
const { adminModel } = require("../db")

const jwt = require("jsonwebtoken")
const { z } = require("zod")
const bcrypt = require("bcrypt")

// JWT SIGN
const JWT_SecretKey = "SUPER_SECRET_KEY"

function auth (req,res,next) { 
    try {
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({
                message : "Token missing"
            })
        }

        const response = jwt.verify(token , JWT_SecretKey);

        req.userId = response.id;
        next();

    } catch(err){
        return res.status(403).json({
            message : "Invalid token"
        })
    }
}

const signupSchema = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    firstName : z.string().min(3),
    lastName : z.string().min(2)
});

adminRoutes.post("/signup" , async (req,res)=>{
  
    const result = signupSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            message : "Invalid Input",
            error : result.error.errors
        })
    }

    const {email , password , firstName , lastName} = result.data;

    // Check if admin already exists
    const existingAdmin = await adminModel.findOne({
        email : email
    })

    if(existingAdmin){
        return res.status(400).json({
            message : "Admin already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password,10);

    await adminModel.create({
        email : email,
        password : hashPassword, 
        firstName : firstName,
        lastName : lastName
    })

    res.json({
        message : "Signup succesfully.."
    })
})

adminRoutes.post('/signin',async(req,res)=>{
    const {email , password} = req.body;

    // this function returns the complete matched document else return null if not found
    const user = await adminModel.findOne({
        email : email
    })

    if(!user){
        return res.status(404).json({
            message : "User Not Found"
        })
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(401).json({
            message : "Invalid password"
        })
    }else{
        const token = jwt.sign({
            id : user._id.toString()
        },JWT_SecretKey)

        res.json({
            message : "Login successful",
            token
        })
    }
})

adminRoutes.post("/course",auth, async (req,res)=>{
    // To add a course
    const adminId = req.userId;
    const { title , description , imageUrl , price } = req.body ;

    const course = await courseModel.create({
        title : title,
        description : description,
        imageUrl : imageUrl,
        price : price , 
        creatorId : adminId 
    })
    res.json({
        message : "course created",
        courseId : course._id
    })

})

adminRoutes.put("/course",auth, async (req,res)=>{ 
    // To update  any course
  const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    // creating a web3 saas in 6 hours
    const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRoutes.get("/course/bulk",auth,async (req,res)=>{
    // Give me all the course that i have created
    const adminId = req.userId;
    
    const courses = await courseModel.find({
        creatorId : adminId
    })
    res.json({
        message : "Course Updated",
        courses
    })
})

module.exports = {
    adminRoutes : adminRoutes
}