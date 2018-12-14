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

function buttonsBlocking(pos) {
  if (pos === 'last') {
    for (let a of allLinks) {
      if (a.dataset.action === 'last' || a.dataset.action === 'next') {
        a.classList.toggle('disabled');
      }
    }
  }
  if (pos === 'first') {
    for (let a of allLinks) {
      if (a.dataset.action === 'first' || a.dataset.action === 'prev') {
        a.classList.toggle('disabled');
      }
    }
  }
  if (pos === 'removeDisabledIfOnFirstPrev') {
    for (let a of allLinks) {
      if (a.classList.contains('disabled') && a.dataset.action === 'first' ||
        a.dataset.action === 'prev') {
        a.classList.remove('disabled');
      }
    }
  }
  if (pos === 'removeDisabledIfOnLastNext') {
    for (let a of allLinks) {
      if (a.classList.contains('disabled') && a.dataset.action === 'last' ||
        a.dataset.action === 'next') {
        a.classList.remove('disabled');
      }
    }
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




