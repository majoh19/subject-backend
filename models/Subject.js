const { Schema, model } = require('mongoose')

const subjectSchema = Schema({

    name: {
        type: String,
        required: true
    },
    creditsNumber: {
        type: Number,
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    prerequisiteSubject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: false
    },
    amountHoursSelfWork: {
        type: Number,
        required: true
    },
    amountHoursDirectedWork: {
        type: Number,
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

module.exports = model('Subject', subjectSchema)