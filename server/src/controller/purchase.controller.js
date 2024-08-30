const Purchase = require('../models/Purchase');
const { purchaseBook, getPurchaseHistory, getAllPurchases } = require('../services/purchase.service');
const { isValidObjectId } = require('../utils/check.id');

const C_purchaseBook = async (req, res) => {
    try {
        const { books } = req.body; // Gözlənilir ki, books [{ bookId, quantity }, ...] formatında olsun
        const userId = req.user._id; // İstifadəçi ID-sini authMiddleware vasitəsilə alırıq

        const purchase = await purchaseBook(userId, books);

        res.status(201).json({ message: 'Kitablar uğurla satın alındı', purchase });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const C_getPurchaseHistory = async (req, res) => {
    try {
        const userId = req.user._id; // Auth middleware vasitəsilə istifadəçinin ID-sini əldə edirik
        console.log(req.user._id, 'bu neyin idisidi user imis');


        const result = await getPurchaseHistory(userId);

        if (result.status !== 200) {
            return res.status(result.status).json({ message: result.message });
        }

        return res.status(200).json(result.purchases);
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ message: 'Server xətası', error });
    }
};

//delete
const C_deletePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!isValidObjectId(id)) {
            return res.status(400).send({ message: 'Yalnış ID formatı' });
        }

        // Satınalma tapılır
        const purchase = await Purchase.findById(id);

        // Əgər satınalma tapılmasa və ya artıq silinmişdirsə
        if (!purchase || purchase.isDeleted) {
            return res.status(404).json({ message: 'Satınalma tapılmadı və ya artıq silinmişdir.' });
        }

        // Satınalma tapılıbsa və silinməyibsə, isDeleted dəyəri true olaraq dəyişdirilir
        purchase.isDeleted = true;
        await purchase.save();

        return res.status(200).json({ message: 'Satınalma uğurla silindi (soft delete)', purchase });
    } catch (error) {
        return res.status(500).json({ message: 'Server xətası', error });
    }
};



//admin
const C_getAllPurchases = async (req, res) => {
    try {
        const result = await getAllPurchases();

        if (result.status !== 200) {
            return res.status(result.status).json({ message: result.message });
        }

        return res.status(200).json({
            purchases: result.purchases,
            totalRevenue: result.totalRevenue
        });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ message: 'Server xətası', error });
    }
};

module.exports = {
    C_purchaseBook,
    C_getPurchaseHistory,
    C_getAllPurchases,
    C_deletePurchase,
};
