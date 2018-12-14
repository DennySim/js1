'use strict';
const nav = document.querySelector('.tabs-nav').children;
const children = document.querySelector('.tabs-content').children;
const childrenCount = document.querySelector('.tabs-content').childElementCount;

let articles = document.querySelectorAll('article');
articles.forEach(art => art.classList.add('hidden'));

function active(e) {
  let prevArticleTab = document.querySelector('.ui-tabs-active');
  prevArticleTab.classList.remove('ui-tabs-active');
  e.currentTarget.classList.add('ui-tabs-active')

  for (let art of articles) {
    if (!(art.classList.contains('hidden'))) {
      art.classList.add('hidden');
    }
    if (art.dataset.tabTitle === e.currentTarget.firstElementChild.textContent) {
      art.classList.remove('hidden');
    }
  }
}

for (let i = 0; i < childrenCount; i++) {
  document.querySelector('.tabs-nav')
    .appendChild(document.querySelector('.fa')
    .parentNode.cloneNode(true));

  nav[i + 1].firstElementChild.textContent = children[i].dataset.tabTitle;
  nav[i + 1].firstElementChild.classList.add(children[i].dataset.tabIcon);
  nav[i + 1].addEventListener('click', active);
}
nav[0].parentNode.removeChild(nav[0])

let article = document.querySelector('article').classList.remove('hidden');
nav[0].classList.add('ui-tabs-active');
