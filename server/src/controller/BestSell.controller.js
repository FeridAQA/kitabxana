const { getBestSellingBooks } = require("../services/BestSell.service");

const C_getBestSellingBooks = async (req, res) => {
    try {
        const bestSellingBooks = await getBestSellingBooks();
        res.json(bestSellingBooks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    C_getBestSellingBooks,
};
