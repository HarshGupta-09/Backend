
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/miniProject-1")
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("Connection Error:", err);
  });

const userSchema =   mongoose.Schema({
    username : String,
    name : String,
    age : Number , 
    email : String , 
    password : String,
    posts : []
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel;