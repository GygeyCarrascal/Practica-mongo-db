const { response } = require('express');
const Vehiculo = require('../models/VehiculosModel');


// LISTAR VehiculoS //
const getVehiculos = async( res = response) => {
    const Vehiculos = await Vehiculo.find()
    res.json({
        ok: true,
        Vehiculos
    });
}

//CREAR Vehiculo
const crearVehiculo = async(req, res = response) => {
    const id = req.id;

    const Vehiculo = new Vehiculo({
        cod_Vehiculo: id,
        ...req.body
    });

    try {
        const VehiculoDB = await Vehiculo.save();
        res.json({
            ok: true,
            Vehiculo: VehiculoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}

//ACTUALIZAR Vehiculo
const actualizarVehiculo = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {
        const Vehiculo = await Vehiculo.findById(id);
        if (!Vehiculo) {
            return res.status(404).json({
                ok: true,
                msg: 'La Vehiculo no existe'
            });
        } else{
            const cambiosVehiculo = {
                ...req.body,
                codVehiculo: uid
            }
    
            const VehiculoActualizada = await Vehiculo.findByIdAndUpdate(id, cambiosVehiculo, { new: true });    
            return res.json({
                ok: true,
                Vehiculo: VehiculoActualizada
    
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

//ELIMINAR Vehiculo
const eliminarVehiculo = async(req, res = response) => {
    const id = req.params.id;

    try {
        const Vehiculo = await Vehiculo.findById(id);
        if (!Vehiculo) {
            return res.status(404).json({
                ok: true,
                msg: 'Vehiculo no encontrada'
            });
        }else{
            await Vehiculo.findByIdAndDelete(id);
            return res.json({
                ok: true,
                msg: 'Vehiculo Eliminada'
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
    getVehiculos,
    crearVehiculo,
    actualizarVehiculo,
    eliminarVehiculo
}