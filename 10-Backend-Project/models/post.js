
const mongoose = require("mongoose");


const postSchema =   mongoose.Schema({
   user : { // ye particular post kis user ki hai uski id stored hai
    type : mongoose.Schema.Types.ObjectId,
    ref : "user"
   } ,
   date : {
    type : Date,
    default : Date.now
   },
   content : String,
   likes : [
    {type : mongoose.Schema.Types.ObjectId, ref : "user"}
   ]
})

const postModel = mongoose.model('post',postSchema)

module.exports = postModel;