const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
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

userSchema.pre('save', async function (next) {
    const user = this

    const isModified = user.isModified('password');
    if(isModified) {
        user.password = await bcrypt.hash(user.password, 8)

        console.log(user.password)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User