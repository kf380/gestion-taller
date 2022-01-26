const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  total: {
    type: Number,
  },
  formaPago: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FormPago",
  },
  status:{
    type: String,
  },
  vehicle:{
     type: mongoose.Schema.Types.ObjectId,
     ref: "Vehicle",

  },
  kilometres:{
    type:Number,
  },
  date:{
    type: String,

  }
});



module.exports = mongoose.model("Order", OrderSchema);