const mongoose = require('mongoose')

mongoose
.connect("mongodb+srv://grupo5:U7VktkRUeh7DdyFZ@misiontic.ckk6j.mongodb.net/carranza?retryWrites=true&w=majority")
.then(()=>console.log('conectado a citas'))
.catch((error)=>console.log(error))

const citaShema = mongoose.Schema({
    placas:String,
    propietario:String,
    cita:String,
    servicios:String,
    comentarios:String,
    estado:Boolean
},{versionKey:false})
const citasModelo = mongoose.model('citas', citaShema)

const mostrar = async ()=>{
    const citas = await citasModelo.find()
    return citas
}

const crear = async (datosGuardados)=>{
    const cita = new citasModelo({ 
        placas:datosGuardados.placas, 
        propietario: datosGuardados.propietario, 
        cita: datosGuardados.cita, 
        servicios:datosGuardados.servicios,
        comentarios: datosGuardados.comentarios, 
        estado: datosGuardados.estado
    })
    await cita.save() 
}

const actualizar= async (datosActualizados)=>{
    const peticion = await citasModelo.updateOne({_id:datosActualizados.id},
    {
        $set:{
            placas: datosActualizados.placas, 
            propietario: datosActualizados.propietario, 
            cita: datosActualizados.cita, 
            servicios: datosActualizados.servicios,
            comentarios: datosActualizados.comentarios, 
            estado: datosActualizados.estado       
        }
    })
}
const eliminar = async (id)=>{
    const peticion = await citasModelo.deleteOne({_id:id})
}

module.exports = { eliminar, actualizar, crear, mostrar }
