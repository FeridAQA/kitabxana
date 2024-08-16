const { purchaseBook } = require('../services/purchase.service');

const C_purchaseBook = async (req, res) => {
    try {
        const { bookId, quantity,price} = req.body;
        const userId = req.user._id; // İstifadəçi ID-sini authMiddleware vasitəsilə alırıq

        const purchase = await purchaseBook(userId, bookId, quantity,price);

        res.status(201).json({ message: 'Kitab uğurla satın alındı', purchase });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    C_purchaseBook,
};
