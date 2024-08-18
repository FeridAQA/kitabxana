const { addItemToBasket } = require("../services/basket.service");

// Basketə kitab əlavə etmək
const C_addToBasket = async (req, res) => {
    try {
        const { bookId, quantity } = req.body;

        // Gələn məlumatları yoxlayın
        if (!bookId || !quantity) {
            return res.status(400).json({ error: 'Book ID və quantity tələb olunur.' });
        }

        const basket = await addItemToBasket(req.user.id, { bookId, quantity });
        res.json(basket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// İstifadəçinin basketini əldə etmək
const C_getBasket = async (req, res) => {
    try {
        const basket = await basketService.getBasketByUserId(req.user.id);
        res.json(basket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Basketdən kitab silmək
const C_removeItem = async (req, res) => {
    try {
        const { bookId } = req.body;
        const basket = await basketService.removeItemFromBasket(req.user.id, bookId);
        res.json(basket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Basketi tamamilə təmizləmək
const C_clearBasket = async (req, res) => {
    try {
        const basket = await basketService.clearBasket(req.user.id);
        res.json({ message: 'Basket cleared successfully', basket });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    C_addToBasket,
    C_getBasket,
    C_removeItem,
    C_clearBasket,
};
