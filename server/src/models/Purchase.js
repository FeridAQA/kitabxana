const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    purchaseDate: { type: Date, default: Date.now }, // Satın alma tarixi
    quantity: { type: Number, required: true }, // Satın alınan kitabın ədədi
    price: { type: Number, required: true }, // Kitabın alınan qiyməti (Book modelindən gəlir)
    totalAmount: { type: Number, required: true } // Toplam məbləğ (quantity * price)
});

module.exports = mongoose.model('Purchase', purchaseSchema);
