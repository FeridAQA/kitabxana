const Book = require("../models/Book");

const searchBooks = async (searchTerm) => {
    // Axtarış kriteriyasını müəyyən edirik
    const searchCriteria = {
        $or: [
            { title: { $regex: searchTerm, $options: 'i' } },         // Kitabın adına görə axtarış
            { description: { $regex: searchTerm, $options: 'i' } },   // Təsvirə görə axtarış
            { author: { $regex: searchTerm, $options: 'i' } }         // Müəllifə görə axtarış
        ]
    };

    // Verilən kriteriyaya görə kitabları axtarırıq
    const books = await Book.find(searchCriteria);

    return books;
};

module.exports={
    searchBooks,
}