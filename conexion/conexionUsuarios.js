const mongoose = require('mongoose')

mongoose
.connect("mongodb+srv://grupo5:U7VktkRUeh7DdyFZ@misiontic.ckk6j.mongodb.net/carranza?retryWrites=true&w=majority")
.then(()=>console.log('conectado a Usuarios'))
.catch((error)=>console.log(error))

const usuarioShema = mongoose.Schema({
    nombre:String,
    documento:String,
    telefono:String,
    correo:String,
    tipo:String,
    clave:Boolean
},{versionKey:false})
const usuariosModelo = mongoose.model('usuarios', usuarioShema)

const mostrar = async ()=>{
    const usuarios = await usuariosModelo.find()
    return usuarios
}

const crear = async (datosGuardados)=>{
    const usuarios = new usuariosModelo({ 
        nombre:datosGuardados.nombre, 
        documento: datosGuardados.documento, 
        telefono: datosGuardados.telefono, 
        correo:datosGuardados.correo,
        tipo: datosGuardados.tipo, 
        clave: datosGuardados.clave
    })
    await usuarios.save() 
}

const actualizar= async (datosActualizados)=>{
    const peticion = await usuariosModelo.updateOne({_id:datosActualizados.id},
    {
        $set:{
            nombre: datosActualizados.nombre, 
            documento: datosActualizados.documento, 
            telefono: datosActualizados.telefono, 
            correo: datosActualizados.correo,
            tipo: datosActualizados.tipo, 
            clave: datosActualizados.clave       
        }
    })
}
const eliminar = async (id)=>{
    const peticion = await usuariosModelo.deleteOne({_id:id})
}

module.exports = { eliminar, actualizar, crear, mostrar }
