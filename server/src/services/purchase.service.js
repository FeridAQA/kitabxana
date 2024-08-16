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
    const user = await User.findById(userId).populate('purchasedBooks');
    user.purchasedBooks.push(purchase._id); // İstifadəçinin purchasedBooks siyahısına əlavə edirik
    await user.save();

    // Satın alma məlumatlarının saxlanması
    await purchase.save();

    return purchase;
};



module.exports={
    purchaseBook,
}
