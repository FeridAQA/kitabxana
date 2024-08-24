const Review = require("../models/Review");

const getPopularBooksByRating = async () => {
    return await Review.aggregate([
        {
            $group: {
                _id: "$book",
                averageRating: { $avg: "$rating" },
                totalReviews: { $sum: 1 }
            }
        },
        {
            $sort: { averageRating: -1, totalReviews: -1 } // Reytinq və rəy sayına görə sıralamaq
        },
        {
            $lookup: {
                
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "bookDetails"
            }
        },
        {
            $unwind: "$bookDetails"
        },
        {
            $project: {
                bookId: "$_id",
                title: "$bookDetails.title",
                author: "$bookDetails.author",
                bookImage: "$bookDetails.coverImage",
                averageRating: 1,
                totalReviews: 1
            }
        },
        {
            $limit: 10 // Ən populyar 10 kitabı göstərmək üçün
        }
    ]);
};

module.exports = {
    getPopularBooksByRating,
};
