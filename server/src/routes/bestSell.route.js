const express =require('express')
const { C_getBestSellingBooks } = require('../controller/BestSell.controller')
const router=express.Router()

router.get('/',C_getBestSellingBooks)


module.exports=router