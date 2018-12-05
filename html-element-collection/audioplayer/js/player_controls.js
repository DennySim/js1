'use strict';

const trackSet = [
  {title: "LA Chill Tour", src: "https://d34x6xks9kc6p2.cloudfront.net/540997b0-a35f-4b69-86d6-b1c925c4a264/540997b0-a35f-4b69-86d6-b1c925c4a264.mp3"},
  {title: "This is it band", src: "https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This is it band.mp3"},
  {title: "LA Fusion Jam", src: "https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA Fusion Jam.mp3"}
];

const playerStatus = document.getElementsByClassName('mediaplayer');
const tracks = document.getElementsByTagName('audio');

var player = tracks[0];
var currentTrackIndex = 0;
var len = trackSet.length;
var trackTitle = document.getElementsByClassName('title')[0];

const playStateButton = document.getElementsByClassName('playstate');
const playState = playStateButton[0].getElementsByClassName('fa-play');
const pauseState = playStateButton[0].getElementsByClassName('fa-pause');
const stopButton = document.getElementsByClassName('stop');
const backButton = document.getElementsByClassName('back');
const nextButton = document.getElementsByClassName('next');

function titleSet() {
  tracks[0].title = trackSet[currentTrackIndex].title;
  tracks[0].src = trackSet[currentTrackIndex].src;
  trackTitle.title = player.title;
}

function back() {
  if (currentTrackIndex === 0) {
    currentTrackIndex = len - 1;
  } else {
    currentTrackIndex = currentTrackIndex - 1;
  }
  titleSet();
  if (playerStatus[0].classList.contains('play')) {
    play();
  }
}

function next() {
  if (currentTrackIndex === len - 1) {
    currentTrackIndex = 0;
  } else {
    currentTrackIndex = currentTrackIndex + 1;
  }
  titleSet();
  if (playerStatus[0].classList.contains('play')) {
    play();
  }
}

function playByPlayButton() {
  if (playerStatus[0].classList.contains('play')) {
    player.pause();
    playerStatus[0].classList.remove('play');
  }
  else {
    play();
  }
}

function stop() {
  player.pause(); player.currentTime = 0;
  playerStatus[0].classList.remove('play');
}

function play() {
  titleSet();
  player.play();
  playerStatus[0].classList.add('play');
}

playStateButton[0].onclick = playByPlayButton;
backButton[0].onclick = back;
nextButton[0].onclick = next;
stopButton[0].onclick = stop;
