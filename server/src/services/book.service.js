const Book = require("../models/Book")

// find butun booklar 
const AllBook = async () => {
    const Books = await Book.find()
    return Books
}

// find book by id

const BookById = async (id) => {
    return await Book.findById(id);
};

// crate book 
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




// delete book
const delBook = async (id) => {
    const book = await Book.findByIdAndDelete(id);
    return book; // Kitab tapıldıqda və uğurla silindikdə qaytarılır
};


// update book
const updateBook = async (id, params) => {
    const { title, author, description,
        categories, publishedDate, coverImage,
        purchasePrice, rentalPrice, availableForPurchase,
        availableForRent, quantity } = params
    const book = await Book.findByIdAndUpdate(id, {
        title, author, description,
        categories, publishedDate, coverImage,
        purchasePrice, rentalPrice, availableForPurchase,
        availableForRent, quantity
    }, { new: true })
    return book;
}



module.exports = {
    AllBook,
    createBook,
    delBook,
    BookById,
    updateBook,
}