const Semester = require('../models/Semester')
const { request, response } = require('express')
const { validationResult, check } = require('express-validator')
const bycript = require('bcryptjs')

//Create semester
const createSemester = async (req = request, res = response) => {

    try {

        await Promise.all([
            check('name', 'invalid.name').not().isEmpty().run(req)
        ])

        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ message: errors.array() })
        }

        const existSemester = await Semester.findOne({ name: req.body.name })
        if (existSemester) {
            return res.status(400).send('The semester already exists')
        }

        let semester = new Semester()
        semester.name = req.body.name

        semester.startDate = req.body.startDate
        semester.endDate = req.body.endDate

        semester = await semester.save()

        res.send(semester)
        
    } catch (error) {

        console.log(error)
        res.status(500).send('An error occured while creating the semester')
        
    }

}

//List semesters
const listSemesters = async (req = request, res = response) => {

    try {

        const semesters = await Semester.find()
        res.send(semesters)
        
    } catch (error) {

        console.log(error)
        res.status(500).send('An error occured while listing the semesters')
        
    }

}

//Edit semester
const editSemester = async (req = request, res = response) => {

    try {

        const semesterId = req.params.semesterId
        const semester = await Semester.findById(semesterId)
        if (!semester) {
            return res.status(404).send('Semester not found')
        }

        if (req.body.name) semester.name = req.body.name
        if (req.body.startDate) semester.startDate = req.body.startDate
        if (req.body.endDate) semester.endDate = req.body.endDate

        const updatedSemester = await semester.save()
        res.send(updatedSemester)
        
    } catch (error) {

        console.log(error)
        res.status(500).send('An error occured while editing the semester')
        
    }

}

//Delete semester
const deleteSemester = async (req = request, res = response) => {

    try {

        const semesterId = req.params.semesterId

        const semester = await Semester.findOne(semesterId)
        if (!semester) {
            return res.status(404).send('Semester not found')
        }

        await Semester.findByIdAndDelete(semesterId)

        res.send('Semester deleted successfully')
        
    } catch (error) {

        console.log(error)
        res.status(500).send('An error occured while deleting the semester')
        
    }

}

module.exports = { createSemester, listSemesters, editSemester, deleteSemester }