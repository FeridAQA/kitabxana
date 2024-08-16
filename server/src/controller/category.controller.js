const { findAllCategories, findCategoryById, createCategory, deleteCategory } = require("../services/categories.service");
const { isValidObjectId } = require("../utils/check.id");

const C_findAllCategory = async (req, res) => {
    try {
        let categori = await findAllCategories(req.body)
        res.send(categori)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })

    }
}

// find by id
const C_findById = async (req, res) => {
    try {
        let { id } = req.params
        if (!isValidObjectId(id)) {
            return res.status(400).send({ message: 'Yanlış ID formatı' });
        }
        let category = await findCategoryById(id)
        if (!category) {
            return res.status(404).send({ message: 'Kategori tapılmadı' });
        }

        // Əgər kategoriya tapılarsa
        res.status(200).json(category);
        


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

// create
const C_createCategory = async (req, res) => {
    try {
        let category = await createCategory(req.body)
        res.send(category)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

// delete
const C_deleteCategory = async (req, res) => {
    try {
        let { id } = req.params
        if (!isValidObjectId(id)) {
            return res.status(400).send({ message: 'Yalnış ID formatı' });
        }

        let category = await findCategoryById(id)
        if (category) {
            let delCategory = await deleteCategory(id)
            return res.status(200).send({ message: 'category uğurla silindi', delCategory });
        } else {
            return res.status(404).send({ message: 'category tapılmadı' });
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    C_findAllCategory,
    C_findById,
    C_createCategory,
    C_deleteCategory
}