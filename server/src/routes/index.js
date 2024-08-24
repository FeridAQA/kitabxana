const express = require("express");
const router = express.Router();

const book_route=require('./book.route')
const user_route=require('./user.route')
const category_route=require('./category.route')
const auth_route=require('./auth.route');
const purchase_route=require('./purchase.route');
const review_route=require('./review.route')
const search_route=require('./search.route')
const filter_route=require('./filter.route')
const popular_route=require('./popular.route')
//bestsell
const bestsell_route=require('./bestSell.route')


const { authMiddleware } = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.use('/book',book_route)
router.use('/user',authMiddleware,roleMiddleware('admin'),user_route)
router.use('/category',category_route)
router.use('/auth',auth_route)
router.use('/porchase',authMiddleware,purchase_route)
router.use('/review',review_route)
router.use('/search',search_route)
router.use('/filter',filter_route)
router.use('/popular',popular_route)
router.use('/bestsell',bestsell_route)

module.exports=router