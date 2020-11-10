const mongoose = require('mongoose');

const VehiculoSchema = new mongoose.Schema({
    //PK
    cod_Vehiculo: {
        type: String,
        unique: true,
        required: true
    },
    Descripcion:{
        type: String,
        required: true,
    }
});

const Vehiculo = mongoose.model('Vehiculo',VehiculoSchema);

module.exports = Vehiculo;
