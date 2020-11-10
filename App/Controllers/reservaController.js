const { response } = require('express');
const Reserva = require('../models/ReservaModel');


// LISTAR ReservaS //
const getReservas = async( res = response) => {
    const Reservas = await Reserva.find().
    //Populate llama a las tablas FK
    populate('Empleado').
    populate('Vehiculo').
    res.json({
        ok: true,
        Reservas
    });
}

//CREAR Reserva
const crearReserva = async(req, res = response) => {
    const id = req.id;

    const reserva = new Reserva({
        codReserva: id,
        ...req.body
    });

    try {
        const reservaDB = await Reserva.save();
        res.json({
            ok: true,
            reserva: reservaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}

//ACTUALIZAR Reserva
const actualizarReserva = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const reserva = await Reserva.findById(id);
        if (!reserva) {
            return res.status(404).json({
                ok: true,
                msg: 'La Reserva no existe'
            });
        } else{
            const cambiosReserva = {
                ...req.body,
                codReserva: uid
            }
    
            const ReservaActualizada = await Reserva.findByIdAndUpdate(id, cambiosReserva, { new: true });
    
            return res.json({
                ok: true,
                reserva: ReservaActualizada
    
            });
        }       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado hable con el administrador'
        });
    }
}

//ELIMINAR Reserva
const eliminarReserva = async(req, res = response) => {
    const id = req.params.cod_Reservas;

    try {
        const Reserva = await Reserva.findById(id);
        if (!Reserva) {
            return res.status(404).json({
                ok: true,
                msg: 'Reserva no encontrada'
            });
        }else{
            await Reserva.findByIdAndDelete(id);
            return res.json({
                ok: true,
                msg: 'Reserva Eliminada'
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
    getReservas,
    crearReserva,
    actualizarReserva,
    eliminarReserva
}