const { Router } = require('express')
const { createUser, listUsers, editUser, deleteUser } = require('../controllers/user')
const router = Router()

//Create
router.post('/', createUser)
//List
router.get('/', listUsers)
//Edit
router.put('/:userId', editUser)
//Delete
router.delete('/:userId', deleteUser)

module.exports = router