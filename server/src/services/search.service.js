const Book = require("../models/Book");
const User = require("../models/User");

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

//for admin

const searchUsers = async (searchTerm) => {
    // Axtarış kriteriyasını müəyyən edirik
    const searchCriteria = {
        $or: [
            { username: { $regex: searchTerm, $options: 'i' } },   // Username-ə görə axtarış
            { email: { $regex: searchTerm, $options: 'i' } }       // Email-ə görə axtarış
        ]
    };

    // Verilən kriteriyaya görə istifadəçiləri axtarırıq
    const users = await User.find(searchCriteria);

    return users;
};


module.exports={
    searchBooks,
    searchUsers,
}