const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos');

const {  getEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado } = require('../controllers/empleadoController');
const { validarJWT } = require('../middleware/validarToken');


const router = Router();

router.get('/', validarJWT, getEmpleados);


router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('salario', 'El salario es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'La estructura del email es incorrecta').isEmail(),
        validarCampos,
    ],
    crearEmpleado);

router.put('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('salario', 'El salario es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'La estructura del email es incorrecta').isEmail(),
        validarCampos,
    ],
    actualizarEmpleado);

router.delete('/', validarJWT, eliminarEmpleado);

module.exports = router; 