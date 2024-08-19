const express=require('express')
const {  C_filterBook } = require('../controller/book.controller')

const routes=express.Router()

routes.get('/',C_filterBook)

module.exports=routes