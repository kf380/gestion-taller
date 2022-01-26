const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const UserSchema = new Schema({
    name:{
        type: String,
        required:[true, "Name is required"]
    },
    password:{
        type: String,
        required:[true, "Password is required"]
    },
    role:{
        type: String,
        emun:["ADMIN_ROLE", "EMPLOYEE_ROLE"]
    }

});

module.exports = mongoose.model("User", UserSchema);