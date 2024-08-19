const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    categories: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    language:{type: String, required: true },
    publishedDate: { type: Date },
    coverImage: { type: String }, // Kitabın qapaq şəkli üçün URL
    purchasePrice: { type: Number, required: true }, // Satış qiyməti
    rentalPrice: { type: Number }, // İcarə qiyməti
    availableForPurchase: { type: Boolean, default: true }, // Satış üçün mövcudluq
    availableForRent: { type: Boolean, default: true }, // İcarə üçün mövcudluq
    isRented: { type: Boolean, default: false }, // İcarəyə götürülüb-götürülmədiyini göstərir
 
    quantity: { type: Number, required: true }, // Kitabın sayı

}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
