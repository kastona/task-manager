const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())

app.post('/users', (req, res) => {
    console.log(req.body)
    res.send('testing')
})

app.listen(PORT, (req, res) => {
    console.log(`Listening on ${PORT}`)
})