const {
    addReview,
    updateReview,
    deleteReview,
    getReviewsByBook
} = require('../services/review.service');

// Kitaba şərh və qiymətləndirmə əlavə etmək
const C_addReview = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { rating, comment } = req.body;

        // Şərh əlavə edirik
        const review = await addReview({
            bookId,
            userId: req.user.id,
            rating,
            comment
        });

        res.status(201).json({ message: 'Review added successfully', review });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Şərhi yeniləmək
const C_updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;

        // Şərhi yeniləyirik
        const updatedReview = await updateReview(reviewId, { rating, comment });

        res.json({ message: 'Review updated successfully', updatedReview });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Şərhi silmək
const C_deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        // Şərhi silirik
        await deleteReview(reviewId);

        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Kitabın bütün şərhlərini almaq
const C_getReviewsByBook = async (req, res) => {
    try {
        const { bookId } = req.params;

        // Kitaba aid bütün şərhləri alırıq
        const reviews = await getReviewsByBook(bookId);

        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    C_addReview,
    C_updateReview,
    C_deleteReview,
    C_getReviewsByBook
};
