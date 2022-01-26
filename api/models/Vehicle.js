const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema ({
    domain:{
        type: String,
    },
    brand:{
        type: String,
    },
    model:{
        type: String,
    },
    kilometers:{
        type: Number,
    },
    age:{
        type: String,
    },
    type:{
        type: String
    },
    
})

module.exports = mongoose.model("Vehicle", VehicleSchema);