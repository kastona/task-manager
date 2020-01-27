const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())

app.post('/users', (req, res) => {
    

    
    const user = new User(req.body)
    user.save().then(data =>{
        res.status(201).send(data)
    }).catch(error => {
        res.status(400)
        res.send(error)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then(users => {
        if(!users) {
            return res.status(400).send()
        }
        res.send(users)
    }).catch(error => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id).then(user => {
        if(!user) {
            return res.status(400).send()
        }

        res.send(user)

    }).catch(error => {
        res.status(500).send()
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(t => {
        res.status(201).send(t)
    }).catch(error => {
        res.status(400).send(error)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then(tasks => {
        if(!tasks) {
            return res.status(400).send()
        }

        res.send(tasks)
    }).catch(error => {
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    Task.findOne({_id: req.params.id}).then(task => {
        if(!task) {
            return res.status(400).send()
        }

        res.send(task)
    }).catch(error => {
        res.status(500).send()
    })
})

app.listen(PORT, (req, res) => {
    console.log(`Listening on ${PORT}`)
})