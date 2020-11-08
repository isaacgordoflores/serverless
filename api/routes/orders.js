const express = require('express')
const Orders = require('../models/Orders')
const { isAuthenticated, hasRole } =  require('../auth')

const router = express.Router()

router.get('/', (req, res) => {
    Orders.find()   // Busca todos los elementos que se encuentren en la coleccion Meals
    .exec()         // ejecuta la query -peticion- y nos devuelve una promesa en la que
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

router.post('/', isAuthenticated, (req, res) => {
    //
    const { _id } = req.user // extraigo el id del usuario que esta en user a traves de req
    // creo el nuevo elemento que recibo
    // y me devuelve una promesa con el codigo de estado y los datos
    Orders.create({ ...req.body, // creo una copia de req.body que viene desde la parte de cliente
                    user_id: _id // le asigno a user_id la id, pero no la que viene del req.body
                                 // si no la que viene de req.user (es mas seguro)
                })
                .then(x => res.status(201).send(x))
})

router.put('/:id', isAuthenticated, // adjunta al usuario al objeto req
                    // hasRole('user'), // usa ese objeto preguntando si tiene ese rol en particular en le momento de acceder a la API
                    (req, res) => {
    // Actualizamos un dato concreto a traves de la id 
    Orders.findOneAndUpdate(req.params.id, req.body)
    // con la promesa devolvemos el codigo de estado
    .then(() => res.sendStatus(204))
})

router.delete('/:id', isAuthenticated, (req, res) => {
    // elimino un elemento a traves de la id
    Orders.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
})

module.exports = router
