const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
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
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
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



module.exports = mongoose.model("Sale", SaleSchema);