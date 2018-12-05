'use strict';

const mainButtonList = document.getElementsByClassName('drum-kit__drum');

function soundPlay() {
  const player = this.getElementsByTagName('audio');
  player[0].currentTime = 0;
  player[0].play();
}

for (const button of mainButtonList) {
  button.onclick = soundPlay;
}
