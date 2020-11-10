/* ruta Vehiculo*/

const { Router } = require('express');
const { getVehiculos,
    crearVehiculo,
    actualizarVehiculo,
    eliminarVehiculo } = require('../controllers/VehiculosController');

const { validarJWT } = require('../middleware/validarToken');


const router = Router();

router.get('/', validarJWT, getVehiculos);


router.post('/',validarJWT,crearVehiculo);

router.put('/:codOficina', validarJWT,actualizarVehiculo);

router.delete('/:codOficina', validarJWT, eliminarVehiculo);



module.exports = router; 