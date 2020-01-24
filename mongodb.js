const {MongoClient, ObjectId} = require('mongodb')

const dbURL = 'mongodb://127.0.0.1:27017'
const databasName = 'task-manager'

MongoClient.connect(dbURL,{ useNewUrlParser: true, useUnifiedTopology: true}).then(client => {

    const db = client.db(databasName)

    db.collection('users').deleteOne({age: 21}).then(result => {
        console.log(result.deletedCount)
    }).catch(error => {
        console.log(error)
    })

}).catch(error => console.log(`Unable to connect to ${databasName} database`))