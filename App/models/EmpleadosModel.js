const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');


const EmpleadoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    salario: {
        type: Number,
        required: true,
    },
    Id_Oficina: {
        required: false,
        type:Number
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

EmpleadoSchema.pre('save',function(next){

    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.password,salts).then(hash => {
            this.password = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));
});

const Empleado = model('Empleado',EmpleadoSchema);

module.exports = Empleado;
