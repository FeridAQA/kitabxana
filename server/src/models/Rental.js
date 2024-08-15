const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    rentalDate: { type: Date, default: Date.now }, // İcarəyə götürmə tarixi
    returnDate: { type: Date }, // Geri qaytarma tarixi
    status: { type: String, enum: ['active', 'completed'], default: 'active' }, // İcarə statusu
    quantity: { type: Number, required: true }, // İcarəyə götürülən kitabın ədədi
    rentalPrice: { type: Number, required: true }, // İcarə qiyməti (Book modelindən gəlir)
    totalAmount: { type: Number, required: true } // Toplam məbləğ (quantity * rentalPrice)
});
module.exports = mongoose.model('Rental', rentalSchema);
