const express = require('express');
const conexionCitas = require('./conexion/conexionCitas');
const conexionServicios = require("./conexion/conexionServicios");
const conexionUsuarios = require("./conexion/conexionUsuarios")
const app = express();
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended:true}))
app.use(cors());

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
app.get('/servicios/eliminar/:id', (request, response) => {
    conexionCitas.eliminar(request.params.id )
    console.log(request.params.id )
    response.send('dato eliminado exitosamente')
})

//----------------------usuarios-------------------------

app.get('/usuarios/ver', async(request, response) => {
    const usuarios = await conexionUsuarios.mostrar()
    response.json(usuarios)
})
app.post('/usuarios/guardar', (request, response) => {
    conexionUsuarios.crear(request.body)
    response.json("datos guardados de forma exitosa")
})
app.post('/usuarios/actualizar', (request, response) => {
    conexionUsuarios.actualizar(request.body)
    response.json("Datos actualizados")
})
app.get('/usuarios/eliminar/:id', (request, response) => {
    conexionUsuarios.eliminar(request.params.id )
    console.log(request.params.id )
    response.send('dato eliminado exitosamente')
})

app.listen(4001)
