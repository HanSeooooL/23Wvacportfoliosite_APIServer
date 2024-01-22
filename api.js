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

//DB API
app.get('/api/DB/selectProject', function (req, res) {
    
})

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})