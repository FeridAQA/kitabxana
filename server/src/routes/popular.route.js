const express=require('express')
const { C_getPopularBooks } = require('../controller/popular.controller')

const routes=express.Router()

routes.get('/',C_getPopularBooks)

module.exports=routes