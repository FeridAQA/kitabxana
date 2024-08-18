const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Admin və ya adi istifadəçi
    registeredDate: { type: Date, default: Date.now },
    rentedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rental' }], // İcarəyə götürülmüş kitablar
    purchasedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }], // Satın alınmış kitablar

    basket: [],
    wishlist: []

});

module.exports = mongoose.model('User', userSchema);