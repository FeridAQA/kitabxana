const express=require('express')
const { C_BookAll, C_createBook, C_delBook, C_updateBook, C_BookById, C_filterBook } = require('../controller/book.controller')
const { authMiddleware } = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/roleMiddleware')

const routes=express.Router()

routes.get('/',C_BookAll) // butun kitablari getirmek 
routes.get('/:id',C_BookById) 
routes.post('/',authMiddleware,roleMiddleware('admin'),C_createBook) // kitab yaratmaq 
routes.delete('/:id',authMiddleware,roleMiddleware('admin'),C_delBook) // kitab silmek
routes.put('/:id',authMiddleware,roleMiddleware('admin'),C_updateBook)

// fiter
routes.get('/filter',C_filterBook)

module.exports=routes