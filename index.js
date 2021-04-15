const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ylija.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()
app.use(cors());
app.use(bodyParser.json());

const port = 4000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    console.log("Error is:", err)
    const usersCollection = client.db("tech-soldiers").collection("users");
    console.log("Database connected Successfully")

    app.post('/addUser', (req, res) => {
        const user = req.body;
        console.log(user)
        usersCollection.insertOne(user)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.post('/addServices', (req, res) => {
        const service = req.body;
        console.log(service)
        usersCollection.insertOne(service)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })



});






app.listen(process.env.PORT || port)