const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CashMovementSchema = new Schema({
  amount: {
    type: Number,
  },
  comments:{
    type: String,
  },
  date:{
    type:String,
  },
  type: {
    type:String,
    enum:['Egreso', 'Ingreso']
  },
  formaPago: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FormPago",
  },
  
});



module.exports = mongoose.model("CashMovement", CashMovementSchema);