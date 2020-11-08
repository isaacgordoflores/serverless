const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const { isAuthenticated } = require('../auth');

const router = express.Router()

/**
 * 
 */
const signToken = (id) => {
    return jwt.sign({ _id }, 'SECRETO PARA ENCRIPTAR LOS ID DE LOS USUARIOS', {
        expiresIn: 60 * 60 * 24 * 365,
    })
}

/**
 * Para registrar un usuario
 */
router.post('/register', (req, res) => {
    const { email, password } = req.body

    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
            const encryptedPassword = key.toString('base64')

        Users.findOne({ email }).exec()
            .then(user => {
                if (user) { // si el usuario exite muestra el mensaje de lo contrario hay que crearlo pidiendo los datos
                    return res.send('Usuario existente')
                }
                Users.create({
                    email,
                    password: encryptedPassword,
                    salt: newSalt,
                })
                .then(() => {
                    res.send('Usuario creado con éxito')
                })
            })
        })
    })
})

/**
 * Para loguear un usuario, iniciar sesión
 */
router.post('/login', (req, res) => {

const { email, password } = req.body
Users.findOne({ email })
    .exec()
    .then(user => {
        if (!user) {
            return res.send('Usuario / contraseña incorrectos')
        }
        crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
            const encryptedPassword = key.toString('base64')
            if (user.password === encryptedPassword) {
                const token = signToken(user._id)

                return res.send({ token })
            }
            return res.send('Usuario / contraseña incorrectos')
        })
    })

})

/**
 * Endpoint para que el usuario obtenga sus propios datos
 */
router.get('/me', isAuthenticated, (req, res) => {
    res.send(req.user)
})

module.exports = router