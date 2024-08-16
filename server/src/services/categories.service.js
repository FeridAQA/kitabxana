const Categories = require("../models/Categories")

const findAllCategories = async () => {
    const categori = await Categories.find()
    return categori
}

module.exports = {
    findAllCategories,
}