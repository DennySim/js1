'use strict';

const preloader = document.querySelector('#preloader');
const contentHtml = document.querySelector('#content');

const tabs = document.querySelectorAll('nav > a');
const initTab = document.querySelector('nav > a');


function preloaderSwitch() {
  //console.log('swithed');
  //console.log(preloader.classList);
  preloader.classList.toggle('hidden');
  // if (preloader.classList.contains('hidden')) {
  //   preloader.classList.remove('hidden');
  // } else {
  //   preloader.classList.add('hidden');
  // }
}

var xhr = new XMLHttpRequest();
xhr.open("GET",
         initTab.href,
         false);
xhr.send();
contentHtml.innerHTML = xhr.responseText;

function setActive(e) {
  function onLoad() {
    contentHtml.innerHTML = xhr.responseText;
}
  e.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", onLoad);
  xhr.addEventListener('loadstart', preloaderSwitch);
  xhr.addEventListener('loadend', preloaderSwitch);
  xhr.open("GET",
           e.currentTarget.href,
           true);
  xhr.send();
  for (var tab of tabs) {
    tab.classList.remove('active');
  }
  this.classList.add('active');
}

for (let tab of tabs) {
 tab.addEventListener('click', setActive);
}



