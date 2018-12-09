/* Данный JS код */

// Регулируем видимость карточки
function toggleCardVisible () {
 document.getElementById('content').classList.toggle('hidden');
 document.getElementById('card').classList.toggle('hidden');
}

document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
      toggleCardVisible();
      document.getElementById('card-title').innerHTML = target.dataset.title;
      document.getElementById('card-author').innerHTML = target.dataset.author;
      document.getElementById('card-info').innerHTML = target.dataset.info;
      document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});

const contentHtml = document.querySelector('#content');
const tabs = document.querySelectorAll('nav > a');
const url = "https://neto-api.herokuapp.com/book/";

var xhr = new XMLHttpRequest();
xhr.addEventListener("load", onLoad);
xhr.open("GET",
         url,
         true);
xhr.send();

const bookListHtmlLocation = document.querySelector('#content')
var htmlBookList = "";

function onLoad() {
  const BooksJsonArr = JSON.parse(xhr.responseText);
  for (let book of BooksJsonArr) {

    let htmlBook = "" +
      "<li" +
      " data-title=\"" + book.title + "\"" +
      " data-author=\"" + book.author[name] + "\"" +
      " data-info=\"" + book.info + "\"" +
      " data-price=\"" + book.price + "\"" + ">" +
      " <img src=\"" + book.cover.small + "\"" + ">" +
      "</li>" + "";

    htmlBookList = htmlBookList.concat(htmlBook);
  }
  bookListHtmlLocation.innerHTML = htmlBookList;
}


