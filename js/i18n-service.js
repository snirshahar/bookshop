'use strict'

var gTrans = {
    title : {
        en : 'My Bookshop',
        he : 'חנות הספרים שלי'
    },
    newBook : {
        en : 'Create New Book',
        he : 'צור ספר חדש'
    },
    bookTitle : {
        en: 'Title',
        he: 'שם הספר'
    },
    price : {
        en : 'Price',
        he : 'מחיר'
    },
    actions : {
        en : 'Actions',
        he: 'פעולות'
    },
    bookId : {
        en: 'ID',
        he: 'מספר מזהה'
    },
    read : {
        en: 'Read',
        he: 'קרא'
    },
    update : {
        en: 'Update',
        he: 'עדכן'
    },
    delete : {
        en: 'Delete',
        he: 'מחק'
    },
}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.dataset.trans;
        var txt = getTrans(transKey);
        el.innerText = txt;
    }
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang];
    if (!txt) txt = keyTrans['en'];

    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}

