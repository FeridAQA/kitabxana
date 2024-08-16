const { findAllCategories } = require("../services/categories.service")

const C_findAllCategori = async (req, res) => {
    try {
        let categori = await findAllCategories(req.body)
        res.send(categori)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message },'ssss')
        
    }
}

module.exports={
    C_findAllCategori,
}