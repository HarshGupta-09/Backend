
const multer = require('multer');

// step 1. disk storage setup
const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null ,'./public/image/uploads')
    },
    filename : function (req,file,cb){
        cb(null , Date.now() + "-"  + file.originalname)
    }
})

// step 2 . creating upload variable 
const upload = multer({
storage : storage
})

// step 3. export and use it 
module.exports = upload
