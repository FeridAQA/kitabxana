const Review = require('../models/Review');

// Şərh əlavə etmək
const addReview = async ({ bookId, userId, rating, comment }) => {
    const review = new Review({
        book: bookId,
        user: userId,
        rating,
        comment
    });

    await review.save();
    return review;
};

// Şərhi yeniləmək
const updateReview = async (reviewId, { rating, comment }) => {
    const review = await Review.findById(reviewId);

    if (!review) {
        throw new Error('Review not found');
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();
    return review;
};

// Şərhi silmək
const deleteReview = async (reviewId) => {
    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
        throw new Error('Review not found');
    }

    return review;
};

// Bir kitabın bütün şərhlərini almaq
const getReviewsByBook = async (bookId) => {
    const reviews = await Review.find({ book: bookId }).populate('user', 'username');
    return reviews;
};

module.exports = {
    addReview,
    updateReview,
    deleteReview,
    getReviewsByBook
};
