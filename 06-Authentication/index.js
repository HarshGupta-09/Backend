const express = require("express");
// Imports
const app = express();
const jwt = require("jsonwebtoken")

// JWT
const JWT_SECRET = "heydhoniCsk"

// MiddleWares

app.use(express.json());

// Variable to store the password and username

const users = [];

// Routes

app.get("/", (req, res) => {
  res.send("Welcome User");
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

// function generateToken(){
//         let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//         let token = "";

//     for(let i = 0; i < options.length; i++){
//         token += options[Math.floor(Math.random() * options.length)];

//     }
//     return token;

// }

app.post("/signin", (req, res) => { // Login
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
app.get("/me",(req,res)=>{
    const token = req.headers.token
    const userDetails = jwt.verify(token,JWT_SECRET) // verifying the user ki vhi hai na jisse apan ne token diya tha , 
    // ab jwt k kaard token store krne ki ya yaad rakhne ki need ni hai 
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
