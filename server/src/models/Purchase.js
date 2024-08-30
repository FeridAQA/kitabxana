const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    books: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
            quantity: { type: Number, required: true }, // Alınan kitabın miqdarı
            price: { type: Number, required: true }, // Kitabın qiyməti
            totalAmount: { type: Number, required: true } // Miqdar * qiymət
        }
    ],
    purchaseDate: { type: Date, default: Date.now }, // Satın alma tarixi
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Purchase', purchaseSchema);
