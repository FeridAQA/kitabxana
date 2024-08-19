const express = require('express');
const { C_searchBooks } = require('../controller/search.controller');
const router = express.Router();

// Kitab axtarışı
router.get('/', C_searchBooks);

module.exports = router;
