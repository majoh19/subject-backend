const Grade = require('../models/Grade')
const User = require('../models/User')
const Subject = require('../models/Subject')
const Semester = require('../models/Semester')
const { request, response } = require('express')
const { validationResult, check } = require('express-validator')

//Create grade
const createGrade = async (req = request, res = response) => {

    try {

        await Promise.all([
            check('student', 'invalid.student').not().isEmpty().run(req),
            check('subject', 'invalid.subject').not().isEmpty().run(req),
            check('grade', 'invalid.grade').not().isEmpty().run(req),
            check('semester', 'invalid.semester').not().isEmpty().run(req)
        ])

        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ message: errors.array() })
        }

        const student = await User.findOne({ _id: req.body.student })
        const subject = await Subject.findOne({ _id: req.body.subject })
        const semester = await Semester.findOne({ _id: req.body.semester })

        if (!student) {
            return res.status(400).send('Invalid student')
        }

        if (!subject) {
            return res.status(400).send('Invalid subject')
        }

        if (!semester) {
            return res.status(400).send('Invalid semester')
        }

        let grade = new Grade()

        grade.student = req.body.student
        grade.subject = req.body.subject
        grade.grade = req.body.grade
        grade.semester = req.body.semester

        grade.creationDate = new Date()
        grade.updateDate = new Date()

        grade = await grade.save()

        res.send(grade)
        
    } catch (error) {

        console.log(error)
        res.status(500).send('An error occured whie creating the grade')
        
    }

}

//List grades
const listGrades = async (req = request, res = response) => {

    try {

        const grades = await Grade.find()
        res.send(grades)
        
    } catch (error) {

        console.log(error)
        res.status(500).send('An error occured while listing the grades')
        
    }

}

//Edit grade
const editGrade = async (req = request, res = response) => {

    try {

        const gradeId = req.params.gradeId
        const grade = await Grade.findById(gradeId)

        if (!grade) {
            return res.status(404).send('Grade nor found')
        }

        if (req.body.student) grade.student = req.body.student
        if (req.body.subject) grade.subject = req.body.subject
        if (req.body.grade) grade.grade = req.body.grade
        if (req.body.semester) grade.semester = req.body.semester

        grade.updateDate = new Date()

        const updatedGrade = await grade.save()

        res.send(updatedGrade)
        
    } catch (error) {

        console.log(error)
        res.status(500).send('An error occured whie editing the grade')
        
    }

}

//Delete grade
const deleteGrade = async (req = request, res = response) => {

    try {

        const gradeId = req.params.gradeId
        const grade = await Grade.findById(gradeId)

        if (!grade) {
            return res.status(404).send('Grade not found')
        }

        await Grade.findByIdAndDelete(gradeId)

        res.send('Grade deleted successfully')
        
    } catch (error) {

        console.log(error)
        res.status(500).send('An error occured while deleting the grade')
        
    }

}

module.exports = { createGrade, listGrades, editGrade, deleteGrade }