const express = require('express')
const Orders = require('../models/Orders')

const router = express.Router()
/**
 * Para obtener un listado
 */
router.get('/', (req, res) => {
    Orders.find()
        .exec()
        .then(x => res.status(200).send(x))
})
/**
 * Para obtener un elemento
 */
router.get('/:id', (req, res) => {
    Orders.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))
})
/**
 * Para crear un elemento
 */
router.post('/', (req, res) => {
    Orders.create(req.body).then(x => res.status(201).send(x))
})
/***
 * Para actualizar un elemento
 */
router.put('/:id', (req, res) => {
    Orders.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.sendStatus(204))
})
/**
 * Para eliminar un elemento
 */
router.delete('/:id', (req, res) => {
    Orders.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
})

module.exports = router