const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const PORT = process.env.PORT || 3000


// app.use((req, res, next) => {
//     res.status(503).send('In maintenance. Checkout later')
// })




app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(PORT, (req, res) => {
    console.log(`Listening on ${PORT}`)
})