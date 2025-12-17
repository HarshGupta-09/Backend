const express = require("express");


const app = express();


function isValid(req, res, next) {
    const age = Number(req.query.age);

    if (age >= 18) {
        next();
    } else {
        return res.status(403).json({
            msg: "You are below 18, can't ride"
        });
    }
}



app.get('/ride1' , isValid,(req,res)=>{
    res.json(
        {
            msg : "You have Succesfully riden the ride 1"
        }
    )

})


app.get('/ride2' , isValid,(req,res)=>{
    res.json(
        {
            msg : "You have Succesfully riden the ride 2"
        }
    )

})



















app.listen(3000,()=>{
    console.log('Server Running on Port 3000')
})