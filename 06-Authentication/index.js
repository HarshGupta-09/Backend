const express = require("express");
// Imports
const app = express();

// MiddleWares

app.use(express.json());

// Variable to store the password and username

const users = [];
console.log(users);
// Routes

app.get("/", (req, res) => {
  res.send("Welcome User");
});

app.post("/signup", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;

  users.push({
    username,
    password,
  });
  res.send({
    message: "You have singned up",
  });
});

function generateToken(){
        let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        let token = "";

    for(let i = 0; i < options.length; i++){
        token += options[Math.floor(Math.random() * options.length)];

    }
    return token;

}

app.post("/signin", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;

  const user = users.find(elem => elem.username == username);
  if(user){
    const token = generateToken();
    res.send({
        token
    })
    console.log(users)

  }else {
    res.status(403).send({
        message : "invalid username or password"
    })
  }


});

app.listen(3000, () => {
  console.log("Server Running on PORT : 3000");
});
