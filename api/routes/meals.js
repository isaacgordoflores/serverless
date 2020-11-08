const express = require('express')
const Meals = require('../models/Meals')

const router = express.Router()
/**
 * Para obtener un listado
 */
router.get('/', (req, res) => {
    Meals.find()// Busca todos los elementos que se encuentren en la coleccion Meals
    // ejecuta la query -peticion- y nos devuelve una promesa en la que
            // indicamos que devolvemos un codigo de estado (http status code) y los datos
        .exec()
        .then(x => res.status(200).send(x))
})
/**
 * Para obtener un elemento
 * Ahora solo pedimos via GET un solo parametro, el id

 */
router.get('/:id', (req, res) => {
    Meals.findById(req.params.id)
        .exec() // ejecuto la consulta
        // nos devuelve la promesa con el codigo de estado y los datos
        .then(x => res.status(200).send(x))
})
/**
 * Para crear un elemento
 */
router.post('/', (req, res) => {
    // creo el nuevo elemento que recibo via POST a traves de BODY
    // y me devuelve una promesa con el codigo de estado y los datos
    Meals.create(req.body).then(x => res.status(201).send(x))
})

/**
 * Para actualizar un elemento
 * Actualizamos un dato concreto a traves de la id 
 */
router.put('/:id', (req, res) => {
    Meals.findByIdAndUpdate(req.params.id, req.body)
        // con la promesa devolvemos el codigo de estado
        .then(() => res.sendStatus(204))
})

/**
 * Para eliminar un elemento
 * Elimino un elemento a traves de la id
 */
router.delete('/:id', (req, res) => {
    Meals.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
})

module.exports = router
