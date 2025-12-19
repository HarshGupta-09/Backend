const express = require("express")

const app = express();

app.get("/add" ,(req,res)=>{
    let query = req.query;
     let num1 = Number(query.a);
    let num2 = Number(query.b);
    let result = num1 + num2;
    res.json({
         ans : result,
        msg : "Operation done"
    })
})

app.get("/multiply" ,(req,res)=>{
      let query = req.query;
    let num1 = Number(query.a);
    let num2 = Number(query.b);
    let result = num1 * num2;
    res.json({
       ans : result,
        msg : "Operation done"
    })
})

app.get("/subtract" ,(req,res)=>{
      let query = req.query;
    let num1 = Number(query.a);
    let num2 = Number(query.b);
    let result = num1 - num2;
    res.json({
        ans : result,
        msg : "Operation done"
    })
})

app.get("/divide" ,(req,res)=>{
      let query = req.query;
 let num1 = Number(query.a);
    let num2 = Number(query.b);
    let result = num1 / num2;
    res.json({
        ans : result,
        msg : "Operation done"
    })
})
app.listen(3000,()=>{
    console.log("Server running on PORT : 3000")
})