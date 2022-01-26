const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShoppingSchema = new Schema({
  date: {
    type: String,
  },
  status: {
    type: String,
  },
  description:{
    type:String,
  },
  formaPago: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FormPago",
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
  total: {
    type: Number,
  },
  IVA: {
    type: String,
  },
  bruto: {
    type: Number,
  },
});



module.exports = mongoose.model("Shopping", ShoppingSchema);