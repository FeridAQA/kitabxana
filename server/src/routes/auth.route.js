const express =require('express')
const { C_login } = require('../controller/auth.controller')
const router=express.Router()

router.post('/login',C_login)


module.exports=router