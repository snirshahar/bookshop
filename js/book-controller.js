'use strict';

doTrans();
renderBooks()

function renderBooks() {
    var books = getBooks();
    var strHTMLs = books.map(function(book) {
        return `<tr>
                    <td>${book.id}</td>
                    <td class="book-name">${book.name}</td>
                    <td>${book.price}$</td>
                    <td>
                        <button data-trans="read" onclick="onReadBook(${book.id})" class="action read-btn">Read</button>
                        <button data-trans="update" onclick="onUpdateBook(${book.id})" class="action update-btn">Update</button>
                        <button data-trans="delete" onclick="onDeleteBook(${book.id})" class="action delete-btn">Delete</button>
                    </td>
                </tr>`
    })
    document.querySelector('.books-container').innerHTML = strHTMLs.join('');
}

function onCreateBook() {
    var elCreateBook = document.querySelector('.create-book');
    var elCreateBooksInputs = elCreateBook.querySelectorAll('input');
    elCreateBooksInputs.forEach(function(elCreateBooksInput) {
        elCreateBooksInput.value = '';
    })
    var elErrorMsg = elCreateBook.querySelector('.error-msg');
    elErrorMsg.innerText = '';
    elCreateBook.classList.remove('hidden');
}

function onAddNewBook() {
    var elNewBookName = document.querySelector('.create-book-name');
    var newBookName = elNewBookName.value;
    var elNewBookPrice = document.querySelector('.create-book-price');
    var newBookPrice = elNewBookPrice.value;
    var elErrorMsg = document.querySelector('.error-msg');
    if (!newBookName || !newBookPrice) {
        elErrorMsg.innerText = 'Book title and price are required';
        return;
    }
    else if (!(newBookPrice >= 0)) {
        elErrorMsg.innerText = 'Book price must be a possitive number';
        return;
    }
    var elNewBookImgUrl = document.querySelector('.create-book-img');
    var newBookImg = elNewBookImgUrl.value;
    addNewBook(newBookName, newBookPrice, newBookImg);
    renderBooks();
    onCloseModal();
}

function onDeleteBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onUpdateBook(bookId) {
    var elUpdateBook = document.querySelector('.update-book');
    var elErrorMsg = elUpdateBook.querySelector('.error-msg');
    elErrorMsg.innerText = '';
    elUpdateBook.classList.remove('hidden');
    var elUpdatePriceBtnContainer = document.querySelector('.update-price-btn-container');
    elUpdatePriceBtnContainer.innerHTML = `<button onclick="onUpdatePrice(${bookId})">Update Price</button>`
}

function onUpdatePrice(bookId) {
    var elNewPrice = document.querySelector('.new-book-price');
    var newPrice = elNewPrice.value;
    var elUpdateBook = document.querySelector('.update-book');
    var elErrorMsg = elUpdateBook.querySelector('.error-msg');
    if (!(newPrice >= 0)) {
        elErrorMsg.innerText = 'Book price must be a possitive number';
        return;
    }
    updateBook(bookId, newPrice);
    renderBooks();
    onCloseModal();
    elNewPrice.value = '';
}

function onReadBook(bookId) {
    var book = getBook(bookId);
    var elBookImg = document.querySelector('.book-img');
    elBookImg.src = `${book.imgUrl}`;
    var elBookDetails = document.querySelector('.book-details');
    var elTitle = elBookDetails.querySelector('.title');
    elTitle.innerText = book.name;
    var elId = elBookDetails.querySelector('.id');
    elId.innerText = book.id;
    var elPrice = elBookDetails.querySelector('.price');
    elPrice.innerText = book.price + ' $';
    var elRating = elBookDetails.querySelector('.rating');
    elRating.innerHTML = `Rating: <button onclick="onChangeRating(${bookId}, -1)">-</button>
                            <span>${book.rating}</span><button onclick="onChangeRating(${bookId}, 1)">+</button>`
    elBookDetails.classList.remove('hidden');
}

function onCloseModal() {
    var elModals = document.querySelectorAll('.modal');
    elModals.forEach(function(elModal) {
        elModal.classList.add('hidden');
    })
}

function onChangeRating(bookId, num) {
    updateRating(bookId, num);
    onReadBook(bookId);
}

function onKeyEvent(key) {
    if (key !== 'Enter') return;
    onAddNewBook();
}


function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    doTrans();
    // renderBooks();
}