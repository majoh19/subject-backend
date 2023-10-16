const User = require('../models/User')
const { request, response } = require('express')
const { validationResult, check } = require('express-validator')
const bycript = require('bcryptjs')

//Create user
const createUser = async (req = request, res = response) => {

    try {
        await Promise.all([
            check('name', 'invalid.name').not().isEmpty().run(req),
            check('email', 'invalid.email').isEmail().run(req),
            check('role', 'invalid.role').isIn(["ESTUDIANTE", "COORDINADOR"]).run(req),
            check('password', 'invalid.password').not().isEmpty().run(req)
        ])

        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ message: errors.array() })
        }

        const existUser = await User.findOne({ email: req.body.email })
        if (existUser) {
            return res.status(400).send('The user already exists')
        }

        let user = new User()
        user.name = req.body.name
        user.email = req.body.email
        user.role = req.body.role

        const salt = bycript.genSaltSync()
        const password = bycript.hashSync(req.body.password, salt)
        user.password = password

        user.creationDate = new Date()
        user.updateDate = new Date()

        user = await user.save()

        res.send(user)

    } catch (error) {
        
        console.log(error)
        res.status(500).send('An error occured while creating the user')

    }

}

//Get users
const listUsers = async (req = request, res = response) => {

    try {
        
        const users = await User.find()
        res.send(users)

    } catch (error) {

        console.log(error)
        res.status(500).send('An error occurred while listing the users')
        
    }

}

//Edit user
const editUser = async (req = request, res = response) => {

    try {

        const userId = req.params.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).send('User not found')
        }

        if (req.body.name) user.name = req.body.name
        if (req.body.email) user.email = req.body.email
        if (req.body.role) user.role = req.body.role

        user.updateDate = new Date()

        const updatedUser = await user.save()
        res.send(updatedUser)
        
    } catch (error) {

        console.log(error)
        res.status(500).send('An error occured while editing the user')
        
    }

}

//Delete user
const deleteUser = async (req = request, res = response) => {

    try {

        const userId = req.params.userId

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).send('User not found')
        }

        await User.findByIdAndDelete(userId)

        res.send('User deleted successfully')
        
    } catch (error) {

        console.log(error)
        res.status(500).send('An error occured while deleting the user')
        
    }

}

module.exports = { createUser, listUsers, editUser, deleteUser }