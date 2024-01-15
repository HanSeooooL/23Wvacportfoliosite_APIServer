const express = require('express');
const { selectProject } = require('./DB/DB');
const app = express();
const port = 3003;

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//DB API
app.get('/api/DB/selectProject', async function (req, res) {
    let data = await selectProject({})
    console.log(data)
    res.send(data)
})