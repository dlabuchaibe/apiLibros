const express = require('express');
const router = express.Router();

const books = require('./controller/books');
const users = require('./controller/users');
const serviBook = require('./../api/services/books');

const app = express();

app.route('/')
.get((req, res) => {
    res.status(200).send(serviBook.listBooks(serviBook.booksArray))
});

router.use('/books', books);
router.use('/users', users);

module.exports = router;