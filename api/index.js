const express = require('express') // require para importar dentro de node
const mongoose = require('mongoose')
const bodyParser = require('body-parser')   
const cors = require('cors')
const meals = require('./routes/meals')
const orders = require('./routes/orders')

const app = express()
/**
 * Para configurar buscar en la documentación de cada una
 * use() es un metodo que permite agregar plugins al servidor express para darle funcionalidades
 */
app.use(bodyParser.json()) 
app.use(cors())

/**
 * BDD CONN
 * Conectar a traves de las variables de entorno (MONGO_URI) y le paso dos opciones de configuración 
 * process.env me permite acceder a las variables de entorno como MONGO_URI y sus variables de configuracion
 */
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

/** '*' cuando llamemos a cualquier ruta con GET devuelve la respuesta de prueba
app.get('*', (req, res) => {
    res.send('PRUEBA DE RESPUESTA')
})
*/

app.use('/api/meals', meals)
app.use('/api/orders', orders)

module.exports = app
