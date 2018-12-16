'use strict';

const allLinks = document.querySelectorAll('a');
allLinks.forEach(link => link.addEventListener('click', clickButtons));

const slides = document.querySelector('.slides').children;
document.querySelector('.slides').firstElementChild.classList.add('slide-current');
buttonsBlocking('first');

let activeElement = document.querySelector('.slide-current');

function toggle() {
  activeElement.classList.toggle('slide-current');
}

function action(action1, action2, state=null) {
  for (let a of allLinks) {
    if (state === null) {
      if (a.dataset.action === action1 || a.dataset.action === action2) {
        a.classList.toggle('disabled');
      }
    } else {
      if (a.classList.contains(state) && a.dataset.action === action1 ||
            a.dataset.action === action2) {
        a.classList.remove('disabled');
      }
    }
  }
}

function buttonsBlocking(pos) {
  if (pos === 'last') {
    action('last', 'next');
  }
  if (pos === 'first') {
    action('first', 'prev');
  }
  if (pos === 'removeDisabledIfOnFirstPrev') {
    action('first', 'prev', 'disabled');
  }
  if (pos === 'removeDisabledIfOnLastNext') {
    action('last', 'next', 'disabled');
  }
}

function clickButtons(e) {
  if (!(e.currentTarget.classList.contains('disabled'))) {
    toggle();
    switch (e.currentTarget.dataset.action) {
      case 'prev':
        if (activeElement === activeElement.parentNode.lastElementChild) {
          buttonsBlocking('last');
        }
        activeElement = activeElement.previousElementSibling;
        toggle();
        if (activeElement === activeElement.parentNode.firstElementChild) {
          buttonsBlocking('first');
        }
        break;
      case 'next':
        if (activeElement === activeElement.parentNode.firstElementChild) {
          buttonsBlocking('first');
        }
        activeElement = activeElement.nextElementSibling;
        toggle();
        if (activeElement === activeElement.parentNode.lastElementChild) {
          buttonsBlocking('last');
        }
        break;
      case 'first':
        activeElement = activeElement.parentNode.firstElementChild;
        toggle();
        buttonsBlocking('first');
        buttonsBlocking('removeDisabledIfOnLastNext');
        break;
      case 'last':
        activeElement = activeElement.parentNode.lastElementChild;
        toggle();
        buttonsBlocking('last');
        buttonsBlocking('removeDisabledIfOnFirstPrev');
        break;
    }
  }
}




