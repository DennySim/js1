'use strict';

const form = document.querySelector('.sign-in-htm');
const formRegistration = document.querySelector('.sign-up-htm');
const outputMessages = document.querySelectorAll('.error-message');

form.addEventListener('submit', (e) => {
  let output = outputMessages[0];
  let jsonData = {};
  const inputFormData = new FormData(form);
  for (const [k, v] of inputFormData) {
    jsonData[k] = v;
  }

  function onLoad() {
    let text = JSON.parse(xhr.responseText);
    if (text.message) {
      output.textContent = text.message;
    } else {
      output.textContent = `Пользователь ${text.name} успешно авторизован`;
    }
  }

  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load', onLoad);
  xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(jsonData));
  e.preventDefault();
});

formRegistration.addEventListener('submit', (e) => {
  let output = outputMessages[1];
  let jsonData = {};
  const inputFormData = new FormData(formRegistration);
  for (const [k, v] of inputFormData) {
    jsonData[k] = v;
  }

  function onLoad() {
    let text = JSON.parse(xhr.responseText);
    if (text.message) {
      output.textContent = text.message;
    } else {
      output.textContent = `Пользователь ${text.name} успешно зарегистрирован`;
    }
  }

  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load', onLoad);
  xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(jsonData));
  e.preventDefault();
});
