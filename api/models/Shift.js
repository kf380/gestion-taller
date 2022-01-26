const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShiftSchema = new Schema ({
    date:{ 
        type: String,
    },
    hour:{
        type: Number,
    },
    email:{
        type: String,
    },
    telephone:{
        type: String,
    },
    description:{
        type: String,
    }
})

module.exports = mongoose.model("Shift", ShiftSchema);