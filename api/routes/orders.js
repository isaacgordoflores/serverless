const express = require('express')
const Orders = require('../models/Orders')

const router = express.Router()

router.get('/', (req, res) => {
    Orders.find() // Busca todos los elementos que se encuentren en la coleccion Meals
    .exec() // ejecuta la query -peticion- y nos devuelve una promesa en la que
            // indicamos que devolvemos un codigo de estado (http status code) y los datos
    .then(x => res.status(200).send(x))
})
// ahora solo pedimos via GET un solo parametro, el id
router.get('/:id', (req, res) => {
    Orders.findById(req.params.id)
    .exec() // ejecuto la consulta
    // nos devuelve la promesa con el codigo de estado y los datos
    .then(x => res.status(200).send(x))
})

router.post('/', (req, res) => {
    // creo el nuevo elemento que recibo via POST a traves de BODY
    // y me devuelve una promesa con el codigo de estado y los datos
    Orders.create(req.body).then(x => res.status(201).send(x))
})

router.put('/:id', (req, res) => {
    // Actualizamos un dato concreto a traves de la id 
    Orders.findOneAndUpdate(req.params.id, req.body)
    // con la promesa devolvemos el codigo de estado
    .then(() => res.sendStatus(204))
})

router.delete('/:id', (req, res) => {
    // elimino un elemento a traves de la id
    Orders.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
})

module.exports = router
