const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ReservaSchema = new mongoose.Schema({
    //PK
    cod_Reservas: {
        type: String,
        unique: true,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    destino:{
        type: String,
        required: true,
   },
    kilometros :{
        type: Number,
        required: true,
   },
    Estado: {
        type: Number,
        default:1
    },
    cod_Vehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo',
        required: true
    },
    Cod_Empleado: {
        type: Schema.Types.ObjectId,
        ref: 'Empleado',
        required: true
    }
});

const Reservas = mongoose.model('Reserva',ReservaSchema);

ReservaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = Reservas;
