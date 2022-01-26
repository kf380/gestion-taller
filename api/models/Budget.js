const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  date:{
    type:String,
  },
  vehicle:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
 },
  total: {
    type: String,
  }
});



module.exports = mongoose.model("Budget", BudgetSchema);