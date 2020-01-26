const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     }, 
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if(value < 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(email) {
//             if(!validator.isEmail(email)) {
//                 throw new Error('Email not valid')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minLength: 7,
//         validate(pass) {
//             if(pass.includes('password')) {
//                 throw new Error('Password not striong enough')
//             }
//         }
//     }
// })


// const newUser = new User({name: 'Steve', age: 32, email: 'stepehkastona@gmail.com', password: 'password'})

// newUser.save().then((me) => console.log(me)).catch(error => console.log(error))


const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,

    }
})

const task = new Task({description: 'Build this app'})

task.save().then(t => {
    console.log(t)
}).catch(error => console.log(error))