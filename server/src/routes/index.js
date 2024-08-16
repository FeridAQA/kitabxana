const express = require("express");
const router = express.Router();

const book_route=require('./book.route')
const user_route=require('./user.route')
const categori_route=require('./categori.route')

router.use('/book',book_route)
router.use('/user',user_route)
router.use('/categori',categori_route)


module.exports=router