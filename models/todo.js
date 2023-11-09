const mongoose = require('mongoose');
const toDoSchema = new mongoose.Schema(
    {
        date :{
            type: String,
            required:true
        },
        time :{
            type: String,
            required:true
        },
        text :{
            type: String,
            required:true
        },
        notes :{
            type: String
        }
    })

module.exports = mongoose.model('todo', toDoSchema);