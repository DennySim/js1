'use strict';

var regexOnlyDigits = /^\d+$/;

const zipCodeHtmlInputList = document.querySelectorAll('input');
const buttons = document.querySelectorAll('button');
const textAreaHtml = document.querySelector('textarea');
textAreaHtml.addEventListener('input', completion);
textAreaHtml.classList.add('unfilled');

const outputs = document.querySelectorAll('output');

for (let btn of buttons) {
  btn.addEventListener('click', switchFormMessage);
}

function switchFormMessage(e) {
  e.preventDefault();
  document.querySelector('.contentform').classList.toggle('hidden');
  document.querySelector('#output').classList.toggle('hidden');
}

var zipCodeHtmlInput;
for (let input of zipCodeHtmlInputList) {

  input.addEventListener('input', completion);
  input.classList.add('unfilled');

  if (input.name === 'zip') {
    zipCodeHtmlInput = input;
  }
}
zipCodeHtmlInput.addEventListener('input', digitsOnly);

function digitsOnly() {
  if (!(zipCodeHtmlInput.value.match(regexOnlyDigits))) {
    zipCodeHtmlInput.value = zipCodeHtmlInput.value.slice(0, -1);
  }
}

function insertIntoOutput() {
  const textMessage = document.querySelector('#message');
  textMessage.value = textAreaHtml.value;

  for (let output of outputs) {
    for (let input of zipCodeHtmlInputList) {
      if (output.id === input.name) {
        output.value = input.value;
        break;
      }
    }
  }
}

function completion(e) {

  if (e.currentTarget.value === null || e.currentTarget.value === "") {
    e.currentTarget.classList.add('unfilled');

  } else {
    e.currentTarget.classList.remove('unfilled');
  }
    let findUnFilled = document.querySelector('.unfilled');
  if (findUnFilled === null) {

    buttons[0].removeAttribute('disabled');
    insertIntoOutput();
  } else {
    buttons[0].setAttribute('disabled', "");
  }
}




