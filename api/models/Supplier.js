const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
    email:{
        type: String,
        unique: true,
        lowercase:true,
        trim:true //elimina espacio en blancos
    },
    name:{
        type: String,
        required: 'Add your name'
    },
    telephone:{
        type:String,
    },
    NIDentificador:{
        type:String,
    },
    address:{
        type:String,
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    }

});

module.exports = mongoose.model('Supplier',SupplierSchema);