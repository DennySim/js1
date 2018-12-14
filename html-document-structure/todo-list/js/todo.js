'use strict';

const inputs = document.querySelectorAll('input');
const done = document.querySelector('.done');
const undone = document.querySelector('.undone')

inputs.forEach(input => input.addEventListener('click', replace));

function replace(e) {

  const label = e.currentTarget.parentNode;
  if (e.currentTarget.classList.contains('checked')) {
    done.appendChild(label);
  } else {
    undone.appendChild(label);
  }
  e.currentTarget.classList.toggle('checked');
}