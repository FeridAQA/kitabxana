const express = require('express');
const { C_searchBooks, C_searchUsers } = require('../controller/search.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// Kitab axtarışı
router.get('/', C_searchBooks);
router.get('/admin',authMiddleware,roleMiddleware('admin'),C_searchUsers)

module.exports = router;
