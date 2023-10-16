const { Schema, model } = require('mongoose')

const userSchema = Schema ({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        required: true,
        enum: ['ESTUDIANTE', 'COORDINADOR']
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

module.exports = model('User', userSchema)