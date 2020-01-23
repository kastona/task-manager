const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)

   db.collection('tasks').insertMany([
       {
           name: 'Dancing',
           completed: true
       },
       {
           name: 'Writing',
           completed: true
       },
       {
           name: 'Marriage',
           completed: false
       }
   ], (error, result) => {
       if(error) {
           return console.log('Unable to insert docs')
       }

       console.log(result.ops)
   })
})