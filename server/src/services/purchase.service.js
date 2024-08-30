const Purchase = require('../models/Purchase');
const Book = require('../models/Book');
const User = require('../models/User');

const purchaseBook = async (userId, books) => {
    const purchaseDetails = [];

    for (const book of books) {
        const { bookId, quantity } = book;
        const bookData = await Book.findById(bookId);

        if (!bookData) {
            throw new Error(`Kitab tapılmadı: ${bookId}`);
        }

        if (bookData.quantity < quantity) {
            throw new Error(`Yetərli miqdarda kitab yoxdur: ${bookData.title}`);
        }

        const totalAmount = bookData.purchasePrice * quantity;

        purchaseDetails.push({
            bookId,
            quantity,
            price: bookData.purchasePrice,
            totalAmount
        });

        // Kitabın mövcud miqdarının yenilənməsi
        bookData.quantity -= quantity;
        await bookData.save();
    }

    // Satın alma məlumatlarının yaradılması
    const purchase = new Purchase({
        userId,
        books: purchaseDetails
    });

    // Satın alma məlumatlarının saxlanması
    await purchase.save();

    // İstifadəçinin purchasedBooks sahəsinə bu kitabları əlavə edirik
    const user = await User.findById(userId);
    purchase.books.forEach(book => user.purchasedBooks.push(book.bookId)); // İstifadəçinin purchasedBooks siyahısına əlavə edirik
    await user.save();

    return purchase;
};



const getPurchaseHistory = async (userId) => {
    try {
        // İstifadəçinin bütün satınalmalarını əldə etmək
        const purchases = await Purchase.find({ userId, isDeleted: false }).populate('books.bookId', 'title author') // Kitabın adı və müəllifi ilə birlikdə

        if (purchases.length === 0) {
            return { message: 'Heç bir satınalma tapılmadı', status: 404 };
        }

        return { purchases, status: 200 };
    } catch (error) {
        return { message: error.message, status: 500 };
    }
};

//delete
const deletePurchase = async (purchaseId) => {
    try {
        const purchase = await Purchase.findById(purchaseId);
        
        if (!purchase) {
            return { message: 'Satın alma tapılmadı', status: 404 };
        }
        purchase.isDeleted = true;
        await purchase.save();
        return { message: 'Satın alma uğurla silindi', status: 200 };
    } catch (error) {
        return { message: error.message, status: 500 };
    }
    }



    // admin 
    const getAllPurchases = async () => {
        try {
            // Bütün satınalma əməliyyatlarını əldə etmək
            const purchases = await Purchase.find().populate('userId', 'username email').populate('bookId', 'title author');

            if (purchases.length === 0) {
                return { message: 'Heç bir satınalma tapılmadı', status: 404 };
            }
            const totalRevenue = purchases.reduce((acc, purchase) => acc + purchase.totalAmount, 0);


            return { totalRevenue, purchases, status: 200 };
        } catch (error) {
            return { message: error.message, status: 500 };
        }
    };


    module.exports = {
        purchaseBook,
        getPurchaseHistory,
        getAllPurchases,
        deletePurchase,
    }
