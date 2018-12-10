'use strict';

const navMenu = document.getElementsByTagName('nav');

const secret = "ytnjkjubz";
let input = ""

function showHideMenu(e) {

  if (e.key === "T" && e.altKey && e.ctrlKey) {
    document.getElementsByTagName('nav')[0].classList.toggle('visible');
  }

  let keyPressed = e.code.split('').pop().toLowerCase();
  if (keyPressed === secret[input.length]) {
    input = input.concat(keyPressed);
  } else {
    input = "";
  }
  if (input === secret) {
    document.getElementsByClassName('secret')[0].classList.add('visible');
  }
}

document.addEventListener('keydown', showHideMenu);