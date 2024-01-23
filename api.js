const DB = require('./DB/DB')
const express = require('express')
const app = express();
const cors = require('cors');
const port = 3001;

const corsOption = {
    origin: ["http://localhost:3000"],
    method: ["GET", "POST", "PUT", "DELETE"],
}

app.use(cors(corsOption))

//DB API
app.get('/api/DB/selectProject', function (req, res) {
    
    DB.selectProject().then(
        result => {
            res.send(result)
        }
    )
    
})

app.get('/api/DB/selectEx_Ac', function (req, res) {

    DB.selectExAc().then(
        result => {
            res.send(result)
        }
    )
})

app.get('/api/DB/selectCareer', function (req, res) {

    DB.selectCareer().then(
        result => {
            res.send(result)
        }
    )
})

app.get('/api/DB/selectTeQu', function (req, res) {

    DB.selectTeQu().then(
        result => {
            res.send(result)
        }
    )
})

app.get('/api/DB/selectLaCe', function (req, res) {

    DB.selectLaCe().then(
        result => {
            res.send(result)
        }
    )
})

app.get('/api/DB/selectContact', function (req, res) {

    DB.selectContact().then(
        result => {
            res.send(result)
        }
    )
})

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})