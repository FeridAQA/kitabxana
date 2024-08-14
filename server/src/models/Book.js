const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    isbn: { type: String },
    publishedDate: { type: Date },
    coverImage: { type: String }, // Kitabın qapaq şəkli üçün URL
    purchasePrice: { type: Number, required: true }, // Satış qiyməti
    rentalPrice: { type: Number }, // İcarə qiyməti
    availableForPurchase: { type: Boolean, default: true }, // Satış üçün mövcudluq
    availableForRent: { type: Boolean, default: true }, // İcarə üçün mövcudluq
    isRented: { type: Boolean, default: false }, // İcarəyə götürülüb-götürülmədiyini göstərir
    ratings: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 }
    }],
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String },
        date: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('Book', bookSchema);
