const express = require("express")
const userRouter = express.Router()

const { z } = require("zod")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { userModel, purchaseModel, courseModel } = require("../db");

const JWT_SecretKey = "SUPER_SECRET_KEY"

const signupSchema = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    firstName : z.string().min(3),
    lastName : z.string().min(2)
});

// userMiddleware for protected routes
function userMiddleware(req,res,next){
    try{
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({
                message : "Token missing"
            })
        }

        const decoded = jwt.verify(token,JWT_SecretKey);
        req.userId = decoded.id;

        next();
    }catch(err){
        return res.status(403).json({
            message : "Invalid token"
        })
    }
}

userRouter.post("/signup" , async (req,res)=>{
   
    const result = signupSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            message : "Invalid Input",
            error : result.error.errors
        })
    }

    const {email , password , firstName , lastName} = result.data;

    const existingUser = await userModel.findOne({
        email : email
    })

    if(existingUser){
        return res.status(400).json({
            message : "User already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password,10);

    await userModel.create({
        email : email,
        password : hashPassword, 
        firstName : firstName,
        lastName : lastName
    })

    res.json({
        message : "Signup succesfully.."
    })
})

userRouter.post('/signin', async (req,res)=>{

    const {email , password} = req.body;

    // this function returns the complete matched document else return null if not found
    const user = await userModel.findOne({
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

userRouter.get("/purchases", userMiddleware, async (req,res)=>{ // List all  purchased courses
    
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {userRouter : userRouter}