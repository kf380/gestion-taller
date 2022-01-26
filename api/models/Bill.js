const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
      },
    date:{
        type:String
    },
    formaPago: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FormPago",
      },
    status:{
        type:String,
    }, 
    description:{
        type:String
    },
    total:{
        type:Number
    },
    bruto:{
        type:Number
    },
    IVA:{
        type:String
    }

});

module.exports = mongoose.model('Bill',BillSchema);