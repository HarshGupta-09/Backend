const express = require("express")

const app = express();



// Routes

app.post("/signup",(req,res)=>{

})

app.post("/signin",(req,res)=>{

})
// Authenticated Route
app.post("/todo",(req,res)=>{ 

})
// Authenticated Route
app.get("/todos",(req,res)=>{

})


app.listen(3000,()=>{
    console.log("Server Runnign on PORt 3000")
})