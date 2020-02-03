const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/users', async (req, res) => {

    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch (err) {
        res.status(400).send(err)
    }
    
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        await user.save()
        res.send({user,token})
    }catch(err) {
        res.status(400).send()
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

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    const isValidOperation = updates.every(update => {
        return allowedUpdates.includes(update)
    })


    if(!isValidOperation) {
        res.status(400).send({error: 'Invalid updates!'})
    }

    const _id = req.params.id
    try {

        let user = await User.findById(_id)

        if(!user) {
            return res.status(401).send()
        }

        updates.forEach(update =>{
            user[update] = req.body[update]
        })

        user = await user.save();
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