const express = require("express");

const app = express();
app.use(express.json())
app.post("/sum", function(req, res) {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({
            error: "Please provide valid numbers a and b"
        });
    }

    res.json({
        ans: a + b
    });
});

app.get("/",(req,res)=>{
    res.send("Hello User")
})

app.listen(3000 ,()=>{
    console.log("server Running on Port 3000")
});