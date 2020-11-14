const jwt = require('jsonwebtoken');
const Users = require('../models/Users')
/**
 * MIDDLEWARE
 * Funcion en node que recibe req, res y next
 * Cuando se llame a la funcion next 
 * se ejecutará el siguiente mddleware
 */

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.sendStatus(403)
    }

    jwt.verify(token, 'SECRETO PARA ENCRIPTAR LOS ID DE LOS USUARIOS', (err, decoded) => {
        const { _id } = decoded 
        Users.findOne({ _id }) // verificamos al usuario
             .exec()
             .then(user => {
                 req.user = user // dejo libre el req para la siguiente peticion
                 next() // paso al siguiente middleware
             })
    })
}

const hasRole = (req, res, next) => {

    if (req.user.role === role) {

       return next()

    }
    res.sendStatus(403)
}
/**
 * const hasRole modificada para varios usuarios
 * 
 * const hasRoles = roles => (req, res, next) => {
 *  if (roles.indexOf(req.user.role) > -1) {
 *  return next() 
 *  }
 * }
 * y en module.exports modifico hasRoles
 * 
 * y en routes/orders.js en router.put
 * tras isAutheticated, hasRoles(['admin', 'user']),
 * le pasamos un array con los datos corrspondentes
 * para segurar que estos perfiles son los que ingresan
 * 
 */

module.exports = {
    isAuthenticated,
    hasRole,
}
