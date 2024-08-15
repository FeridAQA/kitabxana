const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./src/database/index')

const routes=require('./src/routes')

app.use(cors())
app.use(express.json())

const { port } = require("./src/config");
const Book = require('./src/models/Book')

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api/', routes)

app.post('/c', async (req, res) => {
    const { title,
        author,
        description,
        category,
        isbn,
        
        coverImage,
        purchasePrice,
        rentalPrice,
        availableForPurchase,
        availableForRent,
       } = req.body

    const newBook = new Book({
        title,
        author,
        description,
        category,
        isbn,
        coverImage,
        purchasePrice,
        rentalPrice,
        availableForPurchase,
        availableForRent,
    })
    const savedBook = await newBook.save();
        res.status(201).json(savedBook);


})

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})