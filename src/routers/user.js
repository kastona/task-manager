const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/users', async (req, res) => {

    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    }catch (err) {
        res.status(400).send(err)
    }
    
})

router.get('/users', async (req, res) => {
    
    try {
        const users = await User.find({})
        if(!users) {
            return res.status(400).send()
        }
        res.send(users)
    }catch (err) {
        res.status(500).send()
    }

})

router.get('/users/:id', async (req, res) => {
    
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(err) {
        res.status(500).send()
    }
    
})

router.patch('/users/:id', async (req, res) => {

    const _id = req.params.id
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if(!user) {
            return res.status(401).send()
        }

        res.send(user)
    }catch(err) {
        res.status(500).send(err)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    }catch (err) {
        res.status(500).send()
    }
})

module.exports = router