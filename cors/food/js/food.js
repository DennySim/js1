'use strict';

const urlRecipe = "https://neto-api.herokuapp.com/food/42";
const urlRecipeRank = "https://neto-api.herokuapp.com/food/42/rating";
const urlUserList = "https://neto-api.herokuapp.com/food/42/consumers";

const title = document.querySelector('[data-title]')
const ingredients = document.querySelector('[data-ingredients');
const pic = document.querySelector('[data-pic]');

const rating = document.querySelector('[data-rating]');
const votes = document.querySelector('[data-votes]');
const star = document.querySelector('[data-star]');

const consumers = document.querySelector('[data-consumers]');

function loadData(url) {

  let functionName = (() => {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let callbackName;
    for (let i = 0; i < 16; i++) {
      callbackName += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return callbackName;
  })();

  return new Promise((done, fail) => {
    window[functionName] = done;
    let script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

function insert1(data) {
  title.textContent = data.title;
  ingredients.textContent = data.ingredients;
  pic.style.backgroundImage = `url(${data.pic})`;
}

function insert2(data) {
  rating.textContent = data.rating.toFixed(2);
  votes.textContent = `(${data.votes} оценок)`;
  star.style.width = `${data.rating*100/10}%`;
}

function insert3(data) {
  for (let consumer of data.consumers) {
    consumers.innerHTML += `<img src="${consumer.pic}" title="${consumer.name}">`;
  }
  consumers.innerHTML += `(+${data.total - data.consumers.length})`;
}

loadData(urlRecipe)
  .then(data => insert1(data));
loadData(urlRecipeRank)
  .then(data => insert2(data));
loadData(urlUserList)
  .then(data => insert3(data));

