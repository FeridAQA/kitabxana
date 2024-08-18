const express=require('express')
const { C_addReview, C_updateReview, C_deleteReview, C_getReviewsByBook } = require('../controller/review.controller')
const routes=express.Router()

routes.post('/:bookId',C_addReview)
routes.put('/:reviewId',C_updateReview)
routes.delete('/:reviewId',C_deleteReview)

routes.get('/:bookId',C_getReviewsByBook)

module.exports=routes
