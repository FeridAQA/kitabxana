// controllers/bookController.js

const { getPopularBooksByRating } = require("../services/popular.service");

const C_getPopularBooks = async (req, res) => {
    try {
        const popularBooks = await getPopularBooksByRating();
        res.json(popularBooks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    C_getPopularBooks,
};
