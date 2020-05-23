const express = require('express');
const router = express.Router();

const serviBook = require('./../../services/books');
const middleWares = require('./../../middleware');


router.route('/')
.get((req, res) => {
    res.status(200).send(serviBook.listBooks(serviBook.booksArray))
});

router.route('/books')
.post(middleWares.auth, (req, res) => {
    let newBook = {
        id: serviBook.arrayLength(),
        name: req.body.name,
        author: req.body.author
    };
    let newBookName = newBook.name
    !!serviBook.booksArray.find(book => book.name === newBookName) ? 
    res.status(500).send(`El libro ${newBook.name}, ya existe`) : serviBook.booksArray.push(newBook);
    res.status(200).send(`El Libro ${newBook.name}, fue creado`)
});

router.route('/books/:id')
.get((req, res) => {
    let bookId = req.params.id;
    let bookFilter = serviBook.booksArray.filter( (obj) => {
        return (obj.id == bookId);
    });
    res.status(200).send(`Id: ${bookFilter[0].id} \nNombre: ${bookFilter[0].name} \nAutor: ${bookFilter[0].author}`)
});

module.exports = router;