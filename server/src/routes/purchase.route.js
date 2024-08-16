const express=require('express')
const { C_purchaseBook, C_getPurchaseHistory, C_getAllPurchases } = require('../controller/purchase.controller')
const { authMiddleware } = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const routes=express.Router()

routes.get('/',C_getPurchaseHistory)
routes.post('/',C_purchaseBook)
routes.get('/all', authMiddleware, roleMiddleware('admin'), C_getAllPurchases);

module.exports=routes