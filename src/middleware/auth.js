const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = await jwt.verify(token, 'something')
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }catch (err) {

        res.status(401).send({error: 'Please authenticate properly'})
    }
}

module.exports = auth