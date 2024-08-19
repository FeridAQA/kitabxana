const Book = require("../models/Book");
const User = require("../models/User");
const { searchBooks, searchUsers } = require("../services/search.service");

const C_searchBooks = async (req, res) => {
    try {
        // "term" query parametresindən axtarış dəyərini alırıq və trim() ilə boşluqları silirik
        const term = req.query.term ? req.query.term.trim() : '';

        let books;

        if (term) {
            // Axtarış dəyəri varsa, uyğun kitabları tapırıq
            books = await searchBooks(term);
        } else {
            // Əgər axtarış dəyəri boşdursa, bütün kitabları geri qaytarırıq
            books = await Book.find({});
        }

        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const C_searchUsers = async (req, res) => {
    try {
        // "term" query parametresindən axtarış dəyərini alırıq və trim() ilə boşluqları silirik
        const term = req.query.term ? req.query.term.trim() : '';

        let users;

        if (term) {
            // Axtarış dəyəri varsa, uyğun istifadəçiləri tapırıq
            users = await searchUsers(term);
        } else {
            // Əgər axtarış dəyəri boşdursa, bütün istifadəçiləri geri qaytarırıq
            users = await User.find({});
        }

        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



module.exports={
    C_searchBooks,
    C_searchUsers,
}