const express = require('express')
const Meals = require('../models/Meals')

const router = express.Router()
/**
 * Para obtener un listado
 */
router.get('/', (req, res) => {
    Meals.find()
        .exec()
        .then(x => res.status(200).send(x))
})
/**
 * Para obtener un elemento
 */
router.get('/:id', (req, res) => {
    Meals.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))
})
/**
 * Para crear un elemento
 */
router.post('/', (req, res) => {
    Meals.create(req.body).then(x => res.status(201).send(x))
})
/***
 * Para actualizar un elemento
 */
router.put('/:id', (req, res) => {
    Meals.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.sendStatus(204))
})
/**
 * Para eliminar un elemento
 */
router.delete('/:id', (req, res) => {
    Meals.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
})

module.exports = router