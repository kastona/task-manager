const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body, owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    }catch(err) {
        res.status(500).send(error)
    }
    
})

router.get('/tasks', async (req, res) => {

    try {
        const tasks  = await Task.find({})
        if(!tasks) {
            return res.status(404).send()
        }

        res.send(tasks)
    }catch(err) {
        res.status(500).send()
    }
    
})

router.get('/tasks/:id', async (req, res) => {

    try {
        const task = await Task.findOne({_id: req.params.id})
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }catch(err) {
        res.status(500).send()
    }
    
})



router.patch('/tasks/:id', async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']

    const isValidOperation = updates.every(update => {
        return allowedUpdates.includes(update)
    })


    if(!isValidOperation) {
        res.status(400).send({error: 'Invalid updates!'})
    }



    try {
        const task = await Task.findById(req.params.id)

        if(!task) {
            return res.status(404).send()
        }

        updates.forEach(update => {
            task[update] = req.body[update]
        })


        res.send(task)
    }catch (err) {
        res.status(500).send()
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            return res.status(404).send()
        }
        res.send(task)

    }catch(err) {
        res.status(500).send()
    }
})

module.exports = router