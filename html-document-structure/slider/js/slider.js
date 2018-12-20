'use strict';

const allLinks = document.querySelectorAll('a');
allLinks.forEach(link => link.addEventListener('click', clickButtons));

const slides = document.querySelector('.slides').children;
document.querySelector('.slides').firstElementChild.classList.add('slide-current');
updateSliderButtons(['first', 'prev'], true)

let activeElement = document.querySelector('.slide-current');

function toggle() {
  activeElement.classList.toggle('slide-current');
}

function updateSliderButtons(actions, setDisabledClass) {
  for (let a of allLinks) {
    if (actions.includes(a.dataset.action)) {
      a.classList.toggle('disabled', setDisabledClass);
    }
  }
}

function clickButtons(e) {
  if (!(e.currentTarget.classList.contains('disabled'))) {
    toggle();
    switch (e.currentTarget.dataset.action) {
      case 'prev':
        activeElement = activeElement.previousElementSibling;
        toggle();
        updateSliderButtons(['last', 'next'], false)
        if (activeElement === activeElement.parentNode.firstElementChild) {
          updateSliderButtons(['first', 'prev'], true)
        }
        break;
      case 'next':
        activeElement = activeElement.nextElementSibling;
        toggle();
        updateSliderButtons(['first', 'prev'], false)
        if (activeElement === activeElement.parentNode.lastElementChild) {
          updateSliderButtons(['last', 'next'], true)
        }
        break;
      case 'first':
        activeElement = activeElement.parentNode.firstElementChild;
        toggle();
        updateSliderButtons(['first', 'prev'], true)
        updateSliderButtons(['last', 'next'], false)
        break;
      case 'last':
        activeElement = activeElement.parentNode.lastElementChild;
        toggle();
        updateSliderButtons(['last', 'next'], true)
        updateSliderButtons(['first', 'prev'], false)
        break;
    }
  }
}




