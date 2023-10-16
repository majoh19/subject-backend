const jwt = require('jsonwebtoken')

const generateJWT = (User) => {

    const payload = {

        userId: User.userId,
        name: User.name,
        email: User.email,
        password: User.password,
        role: User.role

    }

    const token = jwt.sign(payload, '123456', { expiresIn: '1h' })
    return token

}

module.exports = { generateJWT }