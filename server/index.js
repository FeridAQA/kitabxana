const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./src/database/index')

const routes=require('./src/routes')

app.use(cors())
app.use(express.json())

const { port } = require("./src/config");

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api/', routes)


connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})