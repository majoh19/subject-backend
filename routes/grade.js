const { Router } = require('express')
const { createGrade, listGrades, editGrade, deleteGrade } = require('../controllers/grade')
const router = Router()

//Create
router.post('/', createGrade)
//List
router.get('/', listGrades)
//Edit
router.put('/:gradeId', editGrade)
//Delete
router.delete('/:gradeId', deleteGrade)

module.exports = router