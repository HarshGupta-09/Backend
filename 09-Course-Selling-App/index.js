
const express = require("express")
const app = express();
const { userRouter } = require('./routes/userRoutes');
const { adminRoutes } = require('./routes/adminRoutes');
const{ coursesRoutes } = require("./routes/coursesRoutes");

const mongoose = require("mongoose")



app.get("/",(req,res)=>{
    res.send("Hii there!!")
   
})


app.use("/user",userRouter)
app.use("/courses",coursesRoutes)
app.use("/admin",adminRoutes)





async function main (){
    // only start if database is up / connceted  / working 
    // this is best apporach
    await mongoose.connect("mongodb+srv://harshgupta82003_db_user:lwvNVO8ejjw5U4H0@cluster0.lsomcj4.mongodb.net/coursera-app")
    app.listen(3000,()=>{
    console.log("Server running on Port 3000...")
})
}

main()