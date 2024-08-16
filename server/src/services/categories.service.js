const Categories = require("../models/Categories")

const findAllCategories = async () => {
    const category = await Categories.find()
    return category
}

// find by id
const findCategoryById = async (id) => {
    const category = await Categories.findById(id)
    return category
}


// create 
const createCategory = async (category) => {
    const Category = new Categories(category)
    const newCategory = await Category.save()
    return newCategory
}

//delete 
const deleteCategory = async (id) => {
    await Categories.findByIdAndDelete(id)
    return "Category deleted successfully"
}

module.exports = {
    findAllCategories,
    findCategoryById,
    createCategory,
    deleteCategory
}