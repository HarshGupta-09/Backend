
const express = require("express")
const app = express();
const { userRouter } = require('./routes/userRoutes');
const{ coursesRoutes } = require("./routes/coursesRoutes");

app.get("/",(req,res)=>{
    res.send("Hii there!!")
   
})


app.use("/user",userRouter)
app.use("/courses",coursesRoutes)






app.listen(3000,()=>{
    console.log("Server running on Port 3000...")
})