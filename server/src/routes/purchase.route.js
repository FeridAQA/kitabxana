const express=require('express')
const { C_purchaseBook } = require('../controller/purchase.controller')
const routes=express.Router()

routes.post('/',C_purchaseBook)


module.exports=routes