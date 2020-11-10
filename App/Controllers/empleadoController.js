const Empleado = require('../models/EmpleadosModel');
const { response,res } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/token');


// LISTAR EmpleadoS //
const getEmpleados= async(req, res = response) => {
    const empleados = await Empleado.find();
    
    res.json({
        ok: true,
        empl:empleados
    });
}



//CREAR Empleado/*

function crearEmpleado(req,res){

    const { email } = req.body;
    const usuario = new Empleado(req.body);
    try{
        const existeEmail =  Empleado.findOne({'email':email}, function(err,obj) { console.log("Error",obj); });
        if (existeEmail!=null) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado  '
            });
        }else{
            usuario.save();
            const token =  generateJWT(usuario.id);

            res.json({
            msg:"Usuario registrado con exito",
            usuario,
            token
        })
        }
       
    }
    catch{(error => res.status(500).send({error}));
   }
        

}


//ACTUALIZAR Empleado
const actualizarEmpleado = async(req, res = response) => {

    const id = req.body._id;
    
    console.log(id)
    try {
        const empleado = await Empleado.findOne({"_id":id});
        console.log(empleado)
        if (!empleado) {
            return res.status(404).json({
                ok: true,
                msg: 'El Empleado no existe'
            });
        } else{
            const cambiosEmpleado = {
                ...req.body,
            }
    
            const EmpleadoActualizada = await Empleado.findByIdAndUpdate(id, cambiosEmpleado, { new: true });
    
            return res.json({
                ok: true,
                empleado: EmpleadoActualizada
    
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

//ELIMINAR Empleado
const eliminarEmpleado = async(req, res = response) => {
    const id = req.body.id;

    try {
        const empleado = await Empleado.findById(id);
        if (!empleado) {
            return res.json({
                ok: true,
                msg: 'Empleado Eliminado'
            });
        }else{
            await Empleado.findByIdAndDelete(id);
            return res.json({
                ok: true,
                msg: 'Empleado Eliminada'
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
    getEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
}