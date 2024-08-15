const express=require('express')
const { C_BookAll, C_createBook, C_delBook, C_updateBook } = require('../controller/book.controller')

const routes=express.Router()

routes.get('/',C_BookAll) // butun kitablari getirmek 
routes.post('/',C_createBook) // kitab yaratmaq 
routes.delete('/:id',C_delBook) // kitab silmek
routes.put('/:id',C_updateBook)

module.exports=routes