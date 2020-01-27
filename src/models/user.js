const validator = require('validator')
const mongoose = require('mongoose')


const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true, 
        validate(pass) {
            if(pass.includes('password')) {
                throw new Error('Password not secure!')
            }
        }
    },

    age: {
        type: Number,
        validate(age) {
            if(age <0) {
                throw new Error('Age cannot be negative!')
            }
        }
    }
})

module.exports = User