const DB = require('./DB/DB')
const express = require('express')
const app = express();
const cors = require('cors');
const port = 3001;
const bp = require('body-parser')
const multer = require('multer')
const uuid4 = require('uuid4')
const path = require('path')

const corsOption = {
    origin: ["http://localhost:3000"],
    method: ["GET", "POST", "PUT", "DELETE"],
}

const upload = multer({
    storage: multer.diskStorage({
        filename(req, file, done) {
            const randomID = uuid4()
            const ext = path.extname(file.originalname);
            const filename = randomID + ext;
            done(null, filename)
        },
        destination(req, file, done) {
            console.log(file);
            done(null, path.join(__dirname, "files"))
        }
    })
})

const uploadMiddleware = upload.array('myFiles');

app.use(cors(corsOption))
app.use(bp.urlencoded({extended: true}))
app.use(bp.json())
//app.use(uploadMiddleware)

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

app.post('/api/insertContact', function (req, res) {
    console.log(req.body)
    DB.insertContact(req.body)
})

app.post('/api/insertProject', uploadMiddleware, function (req, res) {
    console.log(req.body)
    console.log(req.files.length)
    //console.log(req.body.date[0])
    DB.insertProject({title: req.body.Title, description: req.body.Description, start: req.body.date[0], finish: req.body.date[1], link: req.body.github}, req.files)
    res.status(200).send('uploaded')
    
})

app.get('/api/DB/projectSelect', function (req, res) {
    console.log(req.query.ID)
    DB.selectProject({ID: req.query.ID}).then(
        result => {
            console.log(result)
            res.send(result)
        }
    )
})

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})