const express = require('express');
const router = express.Router();

const books = require('./controller/books');
const users = require('./controller/users');

router.use('/books', books);
router.use('/users', users);

module.exports = router;