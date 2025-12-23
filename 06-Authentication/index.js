const express = require("express");
// Imports
const app = express();

// MiddleWares

app.use(express.json());

// Variable to store the password and username

const users = [];
console.log(users)
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


  })
});

app.post("/signin", (req, res) => {});

app.listen(3000, () => {
  console.log("Server Running on PORT : 3000");
});
