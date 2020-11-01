const express = require('express')

const router = app.router()
router.get('/', (req, res) => {
    res.send('Hola GET Orders')
})
router.post('/', (req, res) => {
    res.send('Hola POST Orders')
})

module.exports = router