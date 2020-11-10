/* ruta oficinas*/

const { Router } = require('express');
const { getOficinas,
    crearOficina,
    actualizarOficina,
    eliminarOficina } = require('../controllers/oficinasController');

    
const { validarCampos } = require('../middleware/validarCampos');

const { validarJWT } = require('../middleware/validarToken');

const { check } = require('express-validator');


const router = Router();

router.get('/', validarJWT, getOficinas);



    router.post('/', [
        check('direccion', 'El direccion es obligatorio').not().isEmpty(),
    check('localidad', 'El localidad es obligatorio').not().isEmpty(),
    check('provincia', 'El provincia es obligatorio').not().isEmpty(),
        validarCampos,
        validarJWT
    ],
    crearOficina);

router.put('/', validarJWT,actualizarOficina);

router.delete('/', validarJWT, eliminarOficina);



module.exports = router; 