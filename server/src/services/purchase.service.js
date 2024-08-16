const Purchase = require('../models/Purchase');
const Book = require('../models/Book');
const User = require('../models/User');

const purchaseBook = async (userId, bookId, quantity,price) => {
    const book = await Book.findById(bookId);
    if (!book) {
        throw new Error('Kitab tapılmadı');
    }

    if (book.quantity < quantity) {
        throw new Error('Yetərli miqdarda kitab yoxdur');
    }

    // Satın alınan kitabın ümumi məbləği
    const totalAmount = book.purchasePrice * quantity;

    // Satın alma məlumatlarının yaradılması
    const purchase = new Purchase({
        userId,
        bookId,
        quantity,
        price,
        totalAmount
    });

    // Kitabın mövcud miqdarının yenilənməsi
    book.quantity -= quantity;
    await book.save();

    // İstifadəçinin purchasedBooks sahəsinə bu kitabı əlavə edirik
    const user = await User.findById(userId);
    user.purchasedBooks.push(purchase._id); // İstifadəçinin purchasedBooks siyahısına əlavə edirik
    await user.save();

    // Satın alma məlumatlarının saxlanması
    await purchase.save();

    return purchase;
};

const getPurchaseHistory = async (userId) => {
    try {
        // İstifadəçinin bütün satınalmalarını əldə etmək
        const purchases = await Purchase.find({ userId }).populate('bookId', 'title author'); // Kitabın adı və müəllifi ilə birlikdə

        if (purchases.length === 0) {
            return { message: 'Heç bir satınalma tapılmadı', status: 404 };
        }

        return { purchases, status: 200 };
    } catch (error) {
        return { message: error.message, status: 500 };
    }
};
const getAllPurchases = async () => {
    try {
        // Bütün satınalma əməliyyatlarını əldə etmək
        const purchases = await Purchase.find().populate('userId', 'username email').populate('bookId', 'title author');
        
        if (purchases.length === 0) {
            return { message: 'Heç bir satınalma tapılmadı', status: 404 };
        }

        return { purchases, status: 200 };
    } catch (error) {
        return { message: error.message, status: 500 };
    }
};


module.exports={
    purchaseBook,
    getPurchaseHistory,
    getAllPurchases,
}
