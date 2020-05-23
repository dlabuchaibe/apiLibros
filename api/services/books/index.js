const booksArray = [];

const listBooks = () => {
    let books = 'Libros: ';
    for (i=0; i < booksArray.length; i++) {
        books += `\n${i+1}. Id:${booksArray[i].id}, ${booksArray[i].name}, ${booksArray[i].author}`
    }
    return books    
}

const arrayLength = () => {
    return booksArray.length
}



module.exports = {listBooks, arrayLength, booksArray};