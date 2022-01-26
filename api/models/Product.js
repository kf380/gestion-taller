const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
    name:{ 
        type: String,
    },
    identifier:{
        type: String,
    },
    price:{
        type: Number,
    },
    description:{
        type: String,
    },
    stock:{
        type: Number,
    },
    category:{
        type: String 
    },
})

module.exports = mongoose.model("Product", ProductSchema);