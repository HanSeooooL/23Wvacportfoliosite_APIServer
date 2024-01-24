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

app.post('/api/insertEx_Ac', function (req, res) {
    console.log(req.body)
    DB.insertExAc({title: req.body.title, host: req.body.host, start: req.body.start, finish: req.body.finish, awarded: req.body.awarded})
})

app.post('/api/insertCareer', uploadMiddleware, function (req, res) {
    console.log(req.body)
    DB.insertCareer({comp_name: req.body.comp_name, department: req.body.department, responsibilities: req.body.responsibilities, start: req.body.start, finish: req.body.finish, certificate: req.files[0].filename})
})

app.post('/api/insertTeQu', uploadMiddleware, function (req, res) {
    console.log(req.body)
    DB.insertTeQu({name: req.body.name, host: req.body.host, acquisition_date: req.body.acquisition_date, certificate: req.files[0].filename})
})

app.post('/api/insertLaCe', uploadMiddleware, function (req, res) {
    console.log(req.body)
    DB.insertLaCe({name: req.body.name, host: req.body.host, score: req.body.score, acquisition_date: req.body.acquisition_date, certificate: req.files[0].filename})
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

app.get('/api/DB/careerSelect', function (req, res) {
    console.log(req.query.ID)
    DB.selectCareer({ID: req.query.ID}).then(
        result => {
            console.log(result)
            res.send(result)
        }
    )
})

app.get('/api/DB/TeQuSelect', function (req, res) {
    console.log(req.query.NAME)
    console.log(req.query.HOST)
    DB.selectTeQu({NAME: req.query.NAME, HOSt: req.query.HOST}).then(
        result => {
            console.log(result)
            res.send(result)
        }
    )
})

app.get('/api/deleteProject', function (req, res) {
    DB.deleteProject(req.query.ID)
})

app.get('/api/deleteCareer', function (req, res) {
    DB.deleteCareer(req.query.ID)
})

app.get('/api/deleteTeQu', function(req, res) {
    console.log(req.query.NAME)
    DB.deleteTeQu({name: req.query.NAME, host: req.query.HOST})
})

app.get('/api/updateProject', function(req, res) {
    
})

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})