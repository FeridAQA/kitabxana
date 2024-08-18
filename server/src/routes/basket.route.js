const express =require('express')
const { C_getBasket,  C_clearBasket, C_addToBasket } = require('../controller/basket.controller')
const router=express.Router()

router.get('/',C_getBasket)
router.post('/add',C_addToBasket)
router.post('/clear',C_clearBasket)


module.exports=router