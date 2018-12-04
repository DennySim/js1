'use strict';

var picList = document.getElementById('nav').children;
var picFullView = document.getElementById('view');

for (let pic of picList) {
 pic.addEventListener('click', openFullImage);
}

function openFullImage(e) {
  for (let pic of picList) {
    pic.classList.remove('gallery-current');
  }
  e.preventDefault();
  picFullView.attributes.src.value = e.currentTarget.href;
  this.classList.add('gallery-current');
}