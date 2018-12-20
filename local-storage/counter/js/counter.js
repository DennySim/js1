'use strict';

const counter = document.querySelector('#counter');
const incrementButton = document.querySelector('#increment');
const decrementButton = document.querySelector('#decrement');
const resetButton = document.querySelector('#reset');

incrementButton.addEventListener('click', increment);
decrementButton.addEventListener('click', decrement);
resetButton.addEventListener('click', reset);


function inner() {
  counter.innerHTML = localStorage.counter;
}

if (!localStorage.counter) {
  localStorage.counter = 0;
}
inner();

function increment() {
  localStorage.counter++;
  inner();
}

function decrement() {
  if (localStorage.counter > 0) {
    localStorage.counter--;
    inner();
  }
}

function reset() {
  localStorage.counter = 0;
  inner();
}