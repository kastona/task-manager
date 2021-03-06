const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

const upload = multer({
    limits: {
         fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpeg|jpg|png|gif)/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

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
        
        res.send({user,token})
    }catch(err) {
        res.status(400).send(err)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !==req.token
        })
        await req.user.save()
        res.send()
    } catch(err) {
        res.status(500).send(err)
    }
})

router.post('/users/logoutall',auth, async (req, res) => {

    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(err) {
        res.status(500).send()
    }

} )

router.post('/users/me/avatar', auth,upload.single('avatar'), async (req, res) => {

    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send('successful')


}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.get('/users/me', auth, async (req, res) => {
    
   res.send(req.user)

})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    }catch (error) {
        res.status(400).send()
    }
})



router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    const isValidOperation = updates.every(update => {
        return allowedUpdates.includes(update)
    })


    if(!isValidOperation) {
        res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        updates.forEach(update =>{
            req.user[update] = req.body[update]
        })

        await req.user.save();
        res.send(req.user)
    }catch(err) {
        res.status(500).send(err)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        /*const user = await User.findByIdAndDelete(req.user._id)

        if(!user) {
            return res.status(404).send()
        }*/
        await req.user.remove()

        res.send(req.user)
    }catch (err) {
        res.status(500).send()
    }
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    req.user.save()
    res.send()
})

module.exports = router