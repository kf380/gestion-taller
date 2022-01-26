const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormPagoSchema = new Schema({
    formaPago: {
        type: String,
        enum:['EFECTIVO', 'CUENTA CORRIENTE', 'OTROS'],
        default: 'EFECTIVO'
      }

});

module.exports = mongoose.model('FormPago',FormPagoSchema);