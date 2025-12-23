const express = require("express");
// Imports
const app = express();
const jwt = require("jsonwebtoken")
const cors = require("cors")
// JWT
const JWT_SECRET = "heydhoniCsk"

// MiddleWares
app.use(cors())
app.use(express.json());
// This middleware verifies wheather the user is logedin or not, if not the req end here only
function authCheck(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized" });
  }
}



// Variable to store the password and username

const users = [];

// Routes

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  if(users.find(elem=> elem.username === username)){
    res.status(403).send({
        message : "user already exist"
    })
    return;
  }

  users.push({
    username,
    password,
  });
  res.send({
    message: "You have singned up",
  });
});



app.post("/signin", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;

  const user = users.find(elem => elem.username == username);
  if(user){
    const token =jwt.sign({
      username : username
    },JWT_SECRET)

    // user.token = token;
    // users.push(user);
    res.send({
        token
    })
   

  }else {
    res.status(403).send({
        message : "invalid username or password"
    })
  }


});


// Creating an authenticated End point , to get the users info like username and pass if the user send his/her token
app.get("/me",authCheck,(req,res)=>{
    const token = req.headers.token
    const userDetails = jwt.verify(token,JWT_SECRET) 
    const username = userDetails.username;
  const user = users.find(user => user.username === username);

    if(user){
        res.send({
            username : user.username
        })
        console.log(user)

    }else {
        res.status(401).send({
            message : "Unauthorized"
        })
    }
})



app.listen(3000, () => {
  console.log("Server Running on PORT : 3000");
});