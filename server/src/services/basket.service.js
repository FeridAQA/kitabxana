const User = require('../models/User');

// İstifadəçinin basketinə kitab əlavə etmək
const addItemToBasket = async (userId, { bookId, quantity }) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // Gələn bookId-nin düzgün təyin olunduğundan əmin olun
    if (!bookId || !quantity) {
        throw new Error('Book ID və quantity sahələri doldurulmalıdır.');
    }

    // Basketdə həmin kitabın olub olmadığını yoxlayırıq
    const existingItemIndex = user.basket.findIndex((item) => {
        if (!item.bookId) {
            console.error("Item bookId is undefined:", item);
            return false;
        }
        return item.bookId.toString() === bookId;
    });

    if (existingItemIndex >= 0) {
        // Əgər kitab artıq basketdədirsə, miqdarını artırırıq
        user.basket[existingItemIndex].quantity += quantity;
    } else {
        // Əgər kitab basketdə yoxdursa, yeni bir element kimi əlavə edirik
        user.basket.push({ bookId, quantity });
    }

    // Yenilənmiş basketi saxlayırıq
    await user.save();
    
    // Yenilənmiş basketi geri qaytarırıq
    return user.basket;
};





// İstifadəçinin basketini əldə etmək
const getBasketByUserId = async (userId) => {
    const user = await User.findById(userId).populate({
        path: 'basket.book',
        select: 'title price' // Kitabın başlığı və qiyməti alınır
    });

    return user ? user.basket : [];
};

// Basketdən kitabı silmək
const removeItemFromBasket = async (userId, bookId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.basket = user.basket.filter((item) => item.book.toString() !== bookId);

    await user.save();
    return user.basket;
};

// Basketi tamamilə təmizləmək
const clearBasket = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.basket = [];
    await user.save();
    return user.basket;
};

module.exports = {
    addItemToBasket,
    getBasketByUserId,
    removeItemFromBasket,
    clearBasket
};
