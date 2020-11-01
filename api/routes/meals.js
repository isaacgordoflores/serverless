const express = require('express')

const router = app.router()
router.get('/', (req, res) => {
    res.send('Hola GET Meals')
})
router.post('/', (req, res) => {
    res.send('Hola POST Meals')
})

module.exports = router
