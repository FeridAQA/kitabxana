const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    rentalDate: { type: Date, default: Date.now }, // İcarəyə götürmə tarixi
    returnDate: { type: Date }, // Geri qaytarma tarixi
    status: { type: String, enum: ['active', 'completed'], default: 'active' } // İcarə statusu
});

module.exports = mongoose.model('Rental', rentalSchema);
