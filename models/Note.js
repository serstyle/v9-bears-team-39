const mongoose = require('mongoose')
const Schema = mongoose.Schema


const NoteSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
    }
})

module.exports = Note = mongoose.model('note', NoteSchema)