const { response } = require('express');
const Oficina = require('../models/OficinasModel');


// LISTAR OFICINAS //
const getOficinas= async(req, res = response) => {
    const oficinas = await Oficina.find();
    
    res.json({
        ok: true,
        empl:oficinas
    });
}


//CREAR OFICINA
//?

const crearOficina = async(req, res = response) => {
   

    const oficina = new Oficina({
        ...req.body
    });

    try {
        const oficinaDB = await oficina.save();
        res.json({
            ok: true,
            oficina: oficinaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}

//ACTUALIZAR OFICINA
const actualizarOficina = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const oficina = await Oficina.findById(id);
        if (!oficina) {
            return res.status(404).json({
                ok: true,
                msg: 'La oficina no existe'

            });
        } else{
            const cambiosOficina = {
                ...req.body,
                codOficina: uid
            }
    
            const oficinaActualizada = await Oficina.findByIdAndUpdate(id, cambiosOficina, { new: true });
    
            return res.json({
                ok: true,
                oficina: oficinaActualizada
    
            });
        }       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}

//ELIMINAR OFICINA
const eliminarOficina = async(req, res = response) => {
    const id = req.params.id;

    try {

        const oficina = await Oficina.findById(id);
        if (!oficina) {
            return res.status(404).json({
                ok: true,
                msg: 'Oficina no encontrada'

            });
        }else{
            await Oficina.findByIdAndDelete(id);
            return res.json({
                ok: true,
                msg: 'Oficina Eliminada'

            });
        }        


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, pongase en contacto con el administrador'
        });
    }
}


module.exports = {
    getOficinas,
    crearOficina,
    actualizarOficina,
    eliminarOficina
}