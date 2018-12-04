'use strict';

let pathLowSampleFolder = 'sounds/lower/';
let pathMidSampleFolder = 'sounds/middle/';
let pathHighSampleFolder = 'sounds/higher/';
let sampleList = [
  'first.mp3',
  'second.mp3',
  'third.mp3',
  'fourth.mp3',
  'fifth.mp3'
];

const keysSet = document.getElementsByClassName('set');

for (let i = 0; i < keysSet[0].children.length; i++) {
  let button = keysSet[0].children[i];
  button.getElementsByTagName('audio')[0].attributes[0].value =
    pathMidSampleFolder + sampleList[i];
  button.addEventListener('click', piano);
}

function play(path, e) {
  let samplePath = e.currentTarget.getElementsByTagName('audio')[0].
    attributes[0].value.split('/').pop();
  e.currentTarget.getElementsByTagName('audio')[0].attributes[0].value =
    path + samplePath;
  e.currentTarget.getElementsByTagName('audio')[0].play();
}

function pianoMode(e) {
  if (keysSet[0].classList.contains('higher')) {
    play(pathHighSampleFolder, e)
  }
  if (keysSet[0].classList.contains('lower')) {
    play(pathLowSampleFolder, e)
  }
  if (keysSet[0].classList.contains('middle')) {
    play(pathMidSampleFolder, e)
  }
}

function piano(e) {
  if (e.altKey) {
    keysSet[0].classList.remove('lower');
    keysSet[0].classList.remove('middle');
    keysSet[0].classList.add('higher');
    pianoMode(e)
  } else if (e.shiftKey) {
    keysSet[0].classList.remove('higher');
    keysSet[0].classList.remove('middle');
    keysSet[0].classList.add('lower');
    pianoMode(e)
  } else {
    keysSet[0].classList.remove('higher');
    keysSet[0].classList.remove('lower');
    keysSet[0].classList.add('middle');
    pianoMode(e)
  }
}
