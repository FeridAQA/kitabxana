const express =require('express')
const { C_findAllCategory, C_createCategory, C_findById, C_deleteCategory } = require('../controller/category.controller')
const { authMiddleware } = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const router=express.Router()

router.get('/',C_findAllCategory)
router.get('/:id',C_findById)
router.post('/',authMiddleware,roleMiddleware('admin'),C_createCategory)
router.delete('/:id',authMiddleware,roleMiddleware('admin'),C_deleteCategory)

module.exports=router