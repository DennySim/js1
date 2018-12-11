'use strict';

const listBlock = document.querySelector('.list-block');
const inputList = document.querySelectorAll('input');
var output = document.querySelector('output');

output.value = 1;

function setChecked(e) {
  if (e.currentTarget.checked === true) {
    e.currentTarget.checked === false;
    output.value++;
  } else {
    e.currentTarget.checked === true;
    output.value--;
  }
  if (Number(output.value) === inputList.length) {
    console.log('true');
    listBlock.classList.add('complete');
  } else {
    console.log('false');
    listBlock.classList.remove('complete');
  }
}

for (let inp of inputList) {
  inp.addEventListener('click', setChecked);
}




