const express =require('express')
const { C_login, C_createUser } = require('../controller/auth.controller')
const loginLimiter = require('../middleware/loginLimiter')
const registerValidation = require('../middleware/registerValidation')
const { authMiddleware } = require('../middleware/auth.middleware')
const router=express.Router()

router.post('/login',loginLimiter,C_login)
router.post('/register',registerValidation,C_createUser)


router.get('/verifyToken', authMiddleware, (req, res) => {
    // Əgər buraya qədər gəlib çıxırsa, token etibarlıdır
    return res.status(200).json({ message: 'Token is valid', user: req.user });
});


module.exports=router