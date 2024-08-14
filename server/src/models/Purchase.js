const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    purchaseDate: { type: Date, default: Date.now }, // Satın alma tarixi
    price: { type: Number, required: true } // Satın alınan qiymət
});

module.exports = mongoose.model('Purchase', purchaseSchema);
