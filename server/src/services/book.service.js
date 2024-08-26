const Book = require("../models/Book")

// find butun booklar 
const AllBook = async (limit, offset) => {
    const Books = await Book.find()
        .populate('categories', 'name')
        .sort({ createdAt: -1 })
        .skip(parseInt(offset))
        .limit(parseInt(limit));
    return Books;
}

// find book by id

const BookById = async (id) => {
    return await Book.findById(id)
    .populate('categories', 'name')
};

// crate book 
const createBook = async (params) => {
    const { title, author, description,
        categories, language, publishedDate, coverImage,
        purchasePrice, rentalPrice, availableForPurchase,
        availableForRent, quantity } = params
    const book = new Book({
        title, author, description,
        categories, language, publishedDate, coverImage,
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
        categories, language, publishedDate, coverImage,
        purchasePrice, rentalPrice, availableForPurchase,
        availableForRent, quantity } = params
    const book = await Book.findByIdAndUpdate(id, {
        title, author, description,
        categories, language, publishedDate, coverImage,
        purchasePrice, rentalPrice, availableForPurchase,
        availableForRent, quantity
    }, { new: true })
    return book;
}




// filter
const filterBooks = async (params) => {
    return await Book.find(params)
}



module.exports = {
    AllBook,
    createBook,
    delBook,
    BookById,
    updateBook,
    filterBooks,
}