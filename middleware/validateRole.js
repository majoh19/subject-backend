const jwt = require('jsonwebtoken')

const validateRole = ( req, res, next ) => {

    if (req.payload.role != 'COORDINADOR') {
        return res.status(401).json({ message: "Unauthorized" })
    }
    next()

}

module.exports = { validateRole }