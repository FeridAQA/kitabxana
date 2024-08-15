const Book = require("../models/Book")

const AllBook = async () => {
    const Books = await Book.find()
    return Books
}

const createBook = async (params) => {
    const { title, author, description,
        categories, publishedDate, coverImage,
        purchasePrice, rentalPrice, availableForPurchase,
        availableForRent, quantity } = params
    const book = new Book({
        title, author, description,
        categories, publishedDate, coverImage,
        purchasePrice, rentalPrice, availableForPurchase,
        availableForRent, quantity
    })
    const savedBook = await book.save()
    return savedBook
}

module.exports = {
    AllBook,
    createBook
}