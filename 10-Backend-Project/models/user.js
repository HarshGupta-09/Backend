
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
    profilePic: {
      type : String,
      default : "image.png"
    },
    password : String,
  posts: [{ // stores postid's ki user k pass kon kon si posts hai
  type: mongoose.Schema.Types.ObjectId,
  ref: "post"
}]
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel;