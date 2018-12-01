'use strict';

const playerStatus = document.getElementsByClassName('mediaplayer');

const tracks = document.getElementsByTagName('audio');
var player = tracks[0];
var currentTrackIndex = 0;
var len = tracks.length;
var trackTitle = document.getElementsByClassName('title')[0];

const playStateButton = document.getElementsByClassName('playstate');
const playState = playStateButton[0].getElementsByClassName('fa-play');
const pauseState = playStateButton[0].getElementsByClassName('fa-pause');
const stopButton = document.getElementsByClassName('stop');
const backButton = document.getElementsByClassName('back');
const nextButton = document.getElementsByClassName('next');

function titleSet() {
  trackTitle.title = player.title;
}

function back() {
  stop();
  if (currentTrackIndex === 0) {
    currentTrackIndex = len - 1;
    player = tracks[currentTrackIndex];
    play();
  } else {
    currentTrackIndex = currentTrackIndex - 1;
    player = tracks[currentTrackIndex];
    play();
  }
}

function next() {
  stop();
  if (currentTrackIndex === len - 1) {
    currentTrackIndex = 0;
    player = tracks[currentTrackIndex];
    play();
  } else {
    currentTrackIndex = currentTrackIndex + 1;
    player = tracks[currentTrackIndex];
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
