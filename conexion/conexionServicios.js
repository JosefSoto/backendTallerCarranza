const mongoose = require('mongoose')

mongoose
.connect("mongodb+srv://grupo5:U7VktkRUeh7DdyFZ@misiontic.ckk6j.mongodb.net/carranza?retryWrites=true&w=majority")
.then(()=>console.log('conectado a Servicios'))
.catch((error)=>console.log(error))

const servicioShema = mongoose.Schema({
    servicio:String,
    descripcion:String,
    costo:Number,
    duracion:String,
    mecanico:String,
    disponible:Boolean
},{versionKey:false})
const serviciosModelo = mongoose.model('servicios', servicioShema)

const mostrar = async ()=>{
    const servicios = await serviciosModelo.find()
    return servicios
}

const crear = async (datosGuardados)=>{
    const servicio = new serviciosModelo({ 
        servicio:datosGuardados.servicio,
        descripcion:datosGuardados.descripcion,
        costo:datosGuardados.costo,
        duracion:datosGuardados.duracion,
        mecanico:datosGuardados.mecanico,
        disponible:datosGuardados.disponible
    })
    await servicio.save() 
}

const actualizar= async (datosActualizados)=>{
    const peticion = await serviciosModelo.updateOne({_id:datosActualizados.id},
    {
        $set:{
            servicio:datosActualizados.servicio,
            descripcion:datosActualizados.descripcion,
            costo:datosActualizados.costo,
            duracion:datosActualizados.duracion,
            mecanico:datosActualizados.mecanico,
            disponible:datosActualizados.disponible     
        }
    })
}
const eliminar = async (id)=>{
    const peticion = await serviciosModelo.deleteOne({_id:id})
    console.log(id)
}

module.exports = { eliminar, actualizar, crear, mostrar }
