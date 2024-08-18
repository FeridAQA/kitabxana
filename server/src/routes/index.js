const express = require("express");
const router = express.Router();

const book_route=require('./book.route')
const user_route=require('./user.route')
const category_route=require('./category.route')
const auth_route=require('./auth.route');
const purchase_route=require('./purchase.route');
const basket_route=require('./basket.route')


const { authMiddleware } = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.use('/book',book_route)
router.use('/user',authMiddleware,roleMiddleware('admin'),user_route)
router.use('/category',category_route)
router.use('/auth',auth_route)
router.use('/porchase',authMiddleware,purchase_route)
router.use('/basket',authMiddleware,basket_route)


module.exports=router