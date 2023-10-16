const { Schema, model } = require('mongoose')

const gradeSchema = Schema({

    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    semester: {
        type: Schema.Types.ObjectId,
        ref: 'Semester',
        required: true
    },
    creationDate: {
        type: Date,
        default: new Date()
    },
    updateDate: {
        type: Date,
        default: new Date()
    }

})

module.exports = model('Grade', gradeSchema)