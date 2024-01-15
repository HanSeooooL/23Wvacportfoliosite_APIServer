const express = require('express')
const app = express();
const port = 3003;

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//DB API
app.get('/api/DB/selectProject', function (req, res) {
    let ID = req.params('ID');
    
})