const { Router } = require('express')
const { createSemester, listSemesters, editSemester, deleteSemester } = require('../controllers/semester')
const router = Router()

//Create
router.post('/', createSemester)
//List
router.get('/', listSemesters)
//Edit
router.put('/:semesterId', editSemester)
//Delete
router.delete('/:semesterId', deleteSemester)

module.exports = router