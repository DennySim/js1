'use strict';

const bigEye = document.querySelector('.big-book__eye');
const pupilEye = document.querySelector('.big-book__pupil');

document.addEventListener("mousemove", movingEye);

function movingEye(event) {
  const posX = event.pageX,
     posY = event.pageY,
     bodyRect = document.body.getBoundingClientRect(),
     elemRect = pupilEye.getBoundingClientRect(),
     // bodyRect.left is always equal to ZERO
     offsetX = elemRect.left - bodyRect.left + elemRect.width / 2,
     offsetY = elemRect.top - bodyRect.top + elemRect.height / 2,
     deltaX = posX - offsetX,
     deltaY = posY - offsetY,

     offset = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)),
     maxOffset = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
     deltaDistSize = offset / maxOffset,
     maxSize = 3,
     minSize = 1,
     deltaPupilSize = maxSize - minSize,
     sizePupil = maxSize - deltaPupilSize * deltaDistSize,

     maxDelta = 30,
     pupilDeltaX = maxDelta * (deltaX / offsetX),
     pupilDeltaY = maxDelta * (deltaY / offsetY);

  pupilEye.style.setProperty('--pupil-size', sizePupil);
  pupilEye.style.setProperty('--pupil-x', `${pupilDeltaX}px`);
  pupilEye.style.setProperty('--pupil-y', `${pupilDeltaY}px`);
}