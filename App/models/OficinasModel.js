const { Schema, model } = require('mongoose');

const OficinasSchema = Schema({
    direccion: {
        type: String,
        required: true
    },
    localidad: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    }
}, { collection: 'Oficinas' }); 

OficinasSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Oficinas', OficinasSchema);