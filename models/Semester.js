const { Schema, model } = require('mongoose')

const semesterSchema = Schema({

    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }

})

module.exports = model('Semester', semesterSchema)