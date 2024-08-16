const express=require('express')
const { C_findAllUsers, C_findUserById, C_deleteUser } = require('../controller/user.controller')
const routes=express.Router()

routes.get('/',C_findAllUsers)
routes.get('/:id',C_findUserById)

routes.delete('/:id',C_deleteUser)

module.exports=routes
