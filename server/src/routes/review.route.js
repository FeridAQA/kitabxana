const express=require('express')
const { C_addReview, C_updateReview, C_deleteReview, C_getReviewsByBook, C_getAllReviewsByUser } = require('../controller/review.controller')
const { authMiddleware } = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const routes=express.Router()

routes.post('/:bookId',authMiddleware,C_addReview)
routes.put('/:reviewId',authMiddleware,C_updateReview)
routes.delete('/:reviewId',authMiddleware,C_deleteReview)

routes.get('/:bookId',C_getReviewsByBook)

// for admin 
routes.get('/admin/:userId',authMiddleware,roleMiddleware('admin'),C_getAllReviewsByUser)

module.exports=routes
