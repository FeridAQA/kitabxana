const Purchase = require("../models/Purchase");

const getBestSellingBooks = async () => {
    return await Purchase.aggregate([
        {
            $unwind: "$books" // Hər bir kitabı ayrılmaq üçün `$unwind` istifadə edirik
        },
        {
            $group: {
                _id: "$books.bookId",
                totalSold: { $sum: "$books.quantity" } // Hər kitab üçün satılan ümumi miqdar
            }
        },
        {
            $sort: { totalSold: -1 } // Çoxdan aza doğru sıralamaq
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
            $unwind: "$bookDetails" // Kitab məlumatlarını ayrılmaq üçün `$unwind` istifadə edirik
        },
        {
            $project: {
                bookId: "$_id", // Kitabın id-sini əlavə edirik
                title: "$bookDetails.title",
                author: "$bookDetails.author",
                bookImage: "$bookDetails.coverImage", // Kitabın şəklini əlavə edirik
                price:"$bookDetails.purchasePrice",
                description:"$bookDetails.description",
                totalSold: 1
            }
        },
        {
            $limit: 10 // Ən çox satılan 10 kitabı göstərmək üçün
        }
    ]);
};

module.exports = {
    getBestSellingBooks,
};
