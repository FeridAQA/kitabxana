const express = require("express");
const router = express.Router();

const book_route=require('./book.route')

router.use('/book',book_route)

module.exports=router