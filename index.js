const express = require('express');
const conexionCitas = require('./conexion/conexionCitas');
const conexionServicios = require("./conexion/conexionServicios")
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended:true}))

app.get('/', (request, response) => {
    response.send('<h1>Este es el proyecto taller carranza</h1><p>probando llamadas a la</p>')
})
//----------------------Citas-------------------------

app.get('/citas/ver', async (request, response) => {
    const citas = await conexionCitas.mostrar()
    response.json(citas)
})
app.post('/citas/guardar', (request, response) => {
    conexionCitas.crear(request.body)
    response.send('todo ok')
})
app.post('/citas/actualizar/', (request, response) => {
    conexionCitas.actualizar(request.body)
    response.json("Datos actualizados")
}) 
app.get('/citas/eliminar/:id', (request, response) => {
    conexionCitas.eliminar(request.params.id )
    console.log(request.params.id )
    response.send('dato eliminado exitosamente')
})

//----------------------Servicios-------------------------

app.get('/servicios/ver', async(request, response) => {
    const servicios = await conexionServicios.mostrar()
    response.json(servicios)
})
app.post('/servicios/guardar', (request, response) => {
    conexionServicios.crear(request.body)
    response.json("datos guardados de forma exitosa")
})
app.post('/servicios/actualizar', (request, response) => {
    conexionServicios.actualizar(request.body)
    response.json("Datos actualizados")
})
app.get('/servicios/eliminar', (request, response) => {
    conexionCitas.eliminar(request.params.id )
    console.log(request.params.id )
    response.send('dato eliminado exitosamente')
})

app.listen(6000)
