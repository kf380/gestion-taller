const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChequeSchema = new Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
      },
    dateinitial:{
        type:String
    },
    datepayment:{
        type:String
    },
    amount:{
        type:Number,
    }, 
    bank:{
        type:String
    },
    telephone:{
        type:Number
    }

});

module.exports = mongoose.model('Cheque',ChequeSchema);