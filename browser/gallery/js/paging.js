'use strict';

let pathToPicFolder = 'i/';
let picList = [
  'new-museum.jpg',
  'headquarters.jpg',
  'guggenheim-museum.jpg',
  'breuer-building.jpg',
  'IAC.jpg'
];

const currentPhoto = document.getElementById('currentPhoto');
const prevPhoto = document.getElementById('prevPhoto');
const nextPhoto = document.getElementById('nextPhoto');

currentPhoto.src = pathToPicFolder + picList[0];

function findPhotoIndex() {
  return picList.indexOf(currentPhoto.src.split('/').pop());
}

prevPhoto.onclick = function () {
  let currentIndex = findPhotoIndex();
  if (currentIndex === 0) {
    currentIndex = picList.length;
  }
  currentPhoto.src = pathToPicFolder + picList[currentIndex - 1];
  console.log(currentPhoto.src);
};

nextPhoto.onclick = function () {
  let currentIndex = findPhotoIndex();
  if (currentIndex === (picList.length - 1)) {
    currentIndex = -1;
  }
  currentPhoto.src = pathToPicFolder + picList[currentIndex + 1];
};