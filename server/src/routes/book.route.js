const express=require('express')
const { C_BookAll, C_createBook } = require('../controller/book.controller')

const routes=express.Router()

routes.get('/',C_BookAll)
routes.post('/',C_createBook)

module.exports=routes