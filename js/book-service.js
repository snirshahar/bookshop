'use strict';

const NEXT_ID_KEY = 'nextId';
const BOOKS_KEY = 'books';
var gBooks;

createBooks();

function createBooks() {
    var books = loadBooksFromStorage();
    if (!books) {
        books = [
            createBook('Harry Walker', 20),
            createBook('Puki And The Beast', 15),
            createBook('NaN Shades Of Grey', 10)
        ];
    }
    gBooks = books;
    saveBooksToStorage();
}

function createBook(name, price) {
    var bookId = loadNextIdFromStorage();
    if (!bookId) bookId = 101;
    saveNextIdToStorage(bookId+1);
    return {
        id: bookId,
        name: name,
        price: price,
        rating: 0,
        imgUrl: `https://picsum.photos/200/300`
    };
}

function getBooks() {
    return gBooks;
}

function getBook(bookId) {
    return gBooks.find(function(book){return book.id === bookId});
}

function addNewBook(bookName, bookPrice, bookImgUrl) {
    var book = createBook(bookName, bookPrice);
    if (!bookImgUrl) bookImgUrl = 'https://picsum.photos/200/300';
    book.imgUrl = bookImgUrl;
    gBooks.unshift(book);
    saveBooksToStorage();
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book){return book.id === bookId})
    if (bookIdx === -1) return;
    gBooks.splice(bookIdx, 1);
    saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
    var book = getBook(bookId);
    if (!book) return;
    book.price = newPrice;
    saveBooksToStorage();
}

function updateRating(bookId, num) {
    var book = getBook(bookId);
    var newRating = book.rating + num;
    if (newRating > 10 || newRating < 0) return;
    book.rating = newRating;
    saveBooksToStorage();
}

function saveNextIdToStorage(nextId) {
    saveToStorage(NEXT_ID_KEY, nextId);
}

function loadNextIdFromStorage() {
    return +loadFromStorage(NEXT_ID_KEY);
}

function saveBooksToStorage() {
    saveToStorage(BOOKS_KEY, gBooks);
}

function loadBooksFromStorage() {
    return loadFromStorage(BOOKS_KEY);
}

