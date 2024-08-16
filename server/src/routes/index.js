const express = require("express");
const router = express.Router();

const book_route=require('./book.route')
const user_route=require('./user.route')
const category_route=require('./category.route')

router.use('/book',book_route)
router.use('/user',user_route)
router.use('/category',category_route)


module.exports=router