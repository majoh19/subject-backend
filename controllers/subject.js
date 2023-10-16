const Subject = require('../models/Subject')
const { request, response } = require('express')
const { validationResult, check } = require('express-validator')
const { validateJWT } = require('../middleware/validateJWT')
const { validateRole } = require('../middleware/validateRole')

//Create subject
const createSubject = async (req = request, res = response) => {

    try {

        await Promise.all([
            check('name', 'invalid.name').not().isEmpty().run(req),
            check('creditsNumber', 'invalid.creditsNumber').not().isEmpty().run(req),
            check('teacherName', 'invalid.teacherName').not().isEmpty().run(req),
            check('prerequisiteSubject', 'invalid.prerequisiteSubject').not().isEmpty().run(req),
            check('amountHoursSelfWork', 'invalid.amountHoursSelfWork').not().isEmpty().run(req),
            check('amountHoursDirectedWork', 'invalid.amountHoursDirectedWork').not().isEmpty().run(req)
        ])

        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ message: errors.array() })
        }

        const existSubject = await Subject.findOne({ name: req.body.name })
        if (existSubject) {
            return res.status(400).send('The subject already exists')
        }

        validateJWT (req, res, () => {
            validateRole(req, res, async () => {

                let subject = new Subject()
                subject.name = req.body.name
                subject.creditsNumber = req.body.creditsNumber
                subject.teacherName = req.body.teacherName
                subject.prerequisiteSubject = req.body.prerequisiteSubject
                subject.amountHoursSelfWork = req.body.amountHoursSelfWork
                subject.amountHoursDirectedWork = req.body.amountHoursDirectedWork

                subject.creationDate = new Date()
                subject.updateDate = new Date()

                subject = await subject.save()

                res.send(subject)

            })
        })

        
    } catch (error) {

        console.log(error)
        res.status(500).send('An error occured while creating the subject')
        
    }

}

//List subjects
const listSubjects = async (req = request, res = response) => {

    try {

        validateJWT(req, res, async () => {

            const subjects = await Subject.find()
            res.send(subjects)

        })
        
    } catch (error) {

        console.log(error)
        res.status(500).send('An error occured while listing the subjects')
        
    }

}

//Edit subject
const editSubject = async (req = request, res = response) => {

    try {

        validateJWT(req, res, () => {
            validateRole(req, res, async () => {

                const subjectId = req.params.subjectId
                const subject = await Subject.findById(subjectId)
                if (!subject) {
                    return res.status(404).send('Subject not found')
                }

                if (req.body.name) subject.name = req.body.name
                if (req.body.creditsNumber) subject.creditsNumber = req.body.creditsNumber
                if (req.body.teacherName) subject.teacherName = req.body.teacherName
                if (req.body.prerequisiteSubject) subject.prerequisiteSubject = req.body.prerequisiteSubject
                if (req.body.amountHoursSelfWork) subject.amountHoursSelfWork = req.body.amountHoursSelfWork
                if (req.body.amountHoursDirectedWork) subject.amountHoursDirectedWork = req.body.amountHoursDirectedWork

                subject.updateDate = new Date()

                const updatedSubject = await subject.save()
                res.send(updatedSubject)

            })
        })
        
    } catch (error) {

        console.log(error)
        res.status(500).send('An error occured while editing the subject')
        
    }

}

//Delete suject
const deleteSubject = async (req = request, res = response) => {

    try {

        validateJWT(req, res, () => {
            validateRole(req, res, async () => {

                const subjectId = req.params.subjectId

                const subject = await Subject.findById(subjectId)
                if (!subject) {
                    return res.status(404).send('Subject not found')
                }

                await Subject.findByIdAndDelete(subjectId)

                res.send('Subject deleted successfully')

            })
        })
        
    } catch (error) {

        console.log(error)
        res.status(500).send('An error occured while deleting the subject')
        
    }

}

module.exports = { createSubject, listSubjects, editSubject, deleteSubject }