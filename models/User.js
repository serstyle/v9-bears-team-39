const mongoose = require("mongoose")
const Schema = mongoose.Schema 


//Create Schema

const UserSchema = new Schema = ({
    email:{
        type:String,
        required:true
    },
    hash:{
        type:String,
        required:true
    }
})

module.exports = User = mongoose.model('user', UserSchema)