const express =require('express')
const { C_findAllCategory, C_createCategory, C_findById, C_deleteCategory } = require('../controller/category.controller')
const router=express.Router()

router.get('/',C_findAllCategory)
router.get('/:id',C_findById)
router.post('/',C_createCategory)
router.delete('/:id',C_deleteCategory)

module.exports=router