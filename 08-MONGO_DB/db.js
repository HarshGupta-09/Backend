// Will add all our Database logic here , to structure the code better

const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;



// Structure of user ki user document k paas kya kya fileds hogi 
// ki finally data kaise dikhega database / collcetin mai
const User = new Schema ({
    email: {type: String, unique: true},
    password : String,
    name : String
});

// Structure of todo ki todo document k paas kya kya fileds hogi 
const Todo = new Schema({
    title : String,
    done : Boolean,
    userId : ObjectId
})


// Models 
// model yaane ki collcetion btana / bnnana ki iss ex: users collcetion k andar crud krna hai , 
// UserModel ab apan ko methods dega to interact with the Db compass kha eventually apna database ya collection hai CRUD perform krne k lliye 

const UserModel = mongoose.model('users', User);
// This  is where i want to put data 
const TodoModel = mongoose.model('todos', Todo);

module.exports = {
    // users collection mera har user store krega mtlab ki har user k creds ki ye user hai with id and pass
    UserModel,
    // and jo todos collection hai vo har particular user ka todo store krega
    
    TodoModel,
}