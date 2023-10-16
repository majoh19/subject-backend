const { Router } = require('express')
const { createSubject, listSubjects, editSubject, deleteSubject } = require('../controllers/subject')
const router = Router()

//Create
router.post('/', createSubject)
//List
router.get('/', listSubjects)
//Edit
router.put('/:subjectId', editSubject)
//Delete
router.delete('/:subjectId', deleteSubject)

module.exports = router