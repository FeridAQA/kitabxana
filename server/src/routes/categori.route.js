const express =require('express')
const { C_findAllCategori } = require('../controller/categori.controller')
const router=express.Router()

router.get('/',C_findAllCategori)

module.exports=router