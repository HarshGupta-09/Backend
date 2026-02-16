const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
mongoose.connect("mongodb+srv://harshgupta82003_db_user:lwvNVO8ejjw5U4H0@cluster0.lsomcj4.mongodb.net/coursera-app")

const userSchema = new Schema({
    email : {type : String , unique : true},
    password : String ,
    firstName : String,
    lastName : String
}) 

const adminSchema = new Schema ({
      email : {type : String , unique : true},
    password : String ,
    firstName : String,
    lastName : String
})


const courseSchema = new Schema ({
    title : String,
    description : String ,
    price : Number ,
    imageUrl : String,
    creatorId : ObjectId
})

const purchaseSchema = new Schema ({
    courseId : ObjectId,
    userId : ObjectId
})

const userModel = mongoose.model("user",userSchema)

const adminModel = mongoose.model("admin",adminSchema)

const courseModel = mongoose.model("course",courseSchema)

const purchaseModel = mongoose.model("purchase",purchaseSchema)


module.exports = {
    userModel,adminModel,courseModel,purchaseModel
}
