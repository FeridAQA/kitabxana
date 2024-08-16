const express =require('express')
const { C_login, C_createUser } = require('../controller/auth.controller')
const loginLimiter = require('../middleware/loginLimiter')
const router=express.Router()

router.post('/login',loginLimiter,C_login)
router.post('/register',C_createUser)


module.exports=router