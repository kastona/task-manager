const {MongoClient, ObjectID} = require('mongodb')

const dbURL = 'mongodb://127.0.0.1:27017'
const databasName = 'task-manager'

MongoClient.connect(dbURL,{ useNewUrlParser: true, useUnifiedTopology: true}).then(client => {

    const db = client.db(databasName)

    db.collection('users').find({}).toArray().then(arrayData => {
        console.log(arrayData)
    }).catch(error =>{
        console.log('Unable to get data!')
    })



}).then(error => console.log(`Unable to connect to ${databasName} database`))