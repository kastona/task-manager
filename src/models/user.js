const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        unique: true,
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
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})

    if(!user) {
        throw new Error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to login!')
    }

    return user;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'something')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.pre('save', async function (next) {
    const user = this

    const isModified = user.isModified('password');
    if(isModified) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User