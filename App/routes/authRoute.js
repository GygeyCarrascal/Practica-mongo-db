const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken } = require('../controllers/authController');
const { validarCampos } = require('../middleware/validarCampos');
const { validarJWT } = require('../middleware/validarToken');


const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no tiene la estructura requerida').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);


router.get('/renew',
    validarJWT,
    renewToken);


module.exports = router;