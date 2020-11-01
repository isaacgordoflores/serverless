const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')   
const cors = require('cors')
const meals = require('./routes/meals')
const orders = require('./routes/orders')

const app = express()
/**
 * Para configurar buscar en la documentación de cada una
 */
app.use(bodyParser.json())
app.use(cors())

/**
 * BDD CONN
 * Conectar a traves de las variables de entorno (MONGO_URI) y le paso dos opciones de configuración 
 * 
 */
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/api/meals', meals)
app.use('/api/orders', orders)

module.exports = app
