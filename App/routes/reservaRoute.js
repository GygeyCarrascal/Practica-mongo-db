const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos');

const {  getReservas,
    crearReserva,
    actualizarReserva,
    eliminarReserva } = require('../controllers/reservaController');
const { validarJWT } = require('../middleware/validarToken');


const router = Router();

router.get('/', validarJWT, getReservas);


router.post('/', [
        check('fecha', 'El nombre es obligatorio').not().isEmpty(),
        check('destino', 'El apellido es obligatorio').not().isEmpty(),
        check('kilometros', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearReserva);

router.put('/:cod_Vehiculo', [
    check('fecha', 'El nombre es obligatorio').not().isEmpty(),
        check('destino', 'El apellido es obligatorio').not().isEmpty(),
        check('kilometros', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarReserva);

router.delete('/:cod_Vehiculo', validarJWT, eliminarReserva);

module.exports = router; 