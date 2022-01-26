const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
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
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      }],
    telephone:{
        type:String,
    },
    NIDentificador:{
    type: String,
  }

});

module.exports = mongoose.model('Client',ClientSchema);