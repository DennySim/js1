'use strict';

const url = "https://neto-api.herokuapp.com/currency";
const preloader = document.querySelector('#loader');
const main = document.querySelector('#content');
const selects = document.querySelectorAll('select');
const input = document.querySelector('input');
const output = document.querySelector('output');

var currencyList;
var selectCurrentFrom;
var selectCurrentTo;
var currencyFrom;
var currencyTo;

var xhr = new XMLHttpRequest();
xhr.addEventListener("loadstart", onLoadStart);
xhr.addEventListener("loadend", onLoadEnd);
xhr.open("GET",
         url,
         true);
xhr.send();

function onLoadStart() {
  preloader.classList.remove('hidden');
}

function onLoadEnd() {
  preloader.classList.add('hidden');
  main.classList.remove('hidden');
  currencyList = JSON.parse(xhr.responseText);

  var htmlForCurrency = "";
  for (let currency of currencyList) {
    let htmlCurrency = "<option>" + currency.code + "</option>";
    htmlForCurrency = htmlForCurrency.concat(htmlCurrency)
  }

  for (let select of selects) {
    select.innerHTML = htmlForCurrency;
  }

  let selectCodeFrom = selects[0].querySelectorAll('option');
  let selectCodeTo = selects[1].querySelectorAll('option');
  selectCodeFrom[0].selected = true;
  selectCodeTo[0].selected = true;
  selectCurrentFrom = selectCodeFrom[0].value;
  selectCurrentTo = selectCodeTo[0].value;
  changeValue();
}

function selectFromChange(e) {
  selectCurrentTo = e.currentTarget.value;
  calc();
}

function selectToChange(e) {
  selectCurrentFrom = e.currentTarget.value;
  calc();
}

function changeValue() {
  calc();
}

function calc() {
  currencyFrom = currencyList.find(el => el.code === selectCurrentFrom);
  currencyTo = currencyList.find(el => el.code === selectCurrentTo);
  output.value = +(Number(input.value) * Number(currencyFrom.value) /
    Number(currencyTo.value)).toFixed(2);
}

selects[0].onchange = selectFromChange;
selects[1].onchange = selectToChange;
input.addEventListener('input', changeValue);

