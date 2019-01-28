'use strict';

const cat = document.querySelector('.cat');
const catLeftEyePosition = document.querySelector('.cat_position_for_left_eye');
const catRightEyePosition = document.querySelector('.cat_position_for_right_eye');
const catLeftEye = document.querySelector('.cat_eye_left');
const catRightEye = document.querySelector('.cat_eye_right');

const html = document.querySelector('html');
const docHeigth = html.clientHeight;
const docWidth = document.body.clientWidth;

const delay = 16;

function throttle(callback, delay) {
  let isWaiting = false;
  return function () {
    if (!isWaiting) {
      callback.apply(this, arguments);
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false;
      }, delay);
    }
  }
}

const offset = catLeftEye.clientWidth * 3 / 2;

const rectLeftPos = catLeftEyePosition.getBoundingClientRect();
const leftBorderLeftEye = rectLeftPos.left;
const rightBorderLeftEye = rectLeftPos.right - offset;
const topB = rectLeftPos.top;
const bottomB = rectLeftPos.bottom - offset;
const heightB = rectLeftPos.height - 2 * offset;
const widthB = rectLeftPos.width - 2 * offset;

const rectRightPos = catRightEyePosition.getBoundingClientRect();
const leftBorderRightEye = rectRightPos.left;
const rightBorderRightEye = rectRightPos.right - offset;
// const topB = rectRightPos.top;
// const bottomB = rectRightPos.bottom - offset;
// const heightB = rectRightPos.height - 2 * offset;
// const widthB = rectRightPos.width - 2 * offset;

catLeftEye.style.position = "fixed";
catRightEye.style.position = "fixed";

catLeftEye.style.left = (rectLeftPos.left).toString() + "px";
catLeftEye.style.top = (rectLeftPos.top).toString() + "px";
catRightEye.style.left = (rectRightPos.left).toString() + "px";
catRightEye.style.top = (rectRightPos.top).toString() + "px";

const centerLeftX = rectLeftPos.left + rectLeftPos.width / 2;
const centerLeftY = rectLeftPos.top + rectLeftPos.height / 2;

const centerRightX = rectRightPos.left + rectRightPos.width / 2;
const centerRightY = rectRightPos.top + rectRightPos.height / 2;

function cursorPos(e, xO, yO, leftB, rightB, eye) {

  const alfa = Math.atan((yO - e.clientY) / (xO - e.clientX));
  const alfaGrad = Math.atan((yO - e.clientY) / (xO - e.clientX)) * 180 / Math.PI;

  if (e.clientX < xO && e.clientY < yO) {
    if (alfaGrad >= 0 && alfaGrad < 45) {
      eye.style.left = (leftB).toString() + "px";
      eye.style.top = ((yO - Math.tan(alfa) * widthB  / 2)
        - offset).toString() + "px";
    } else if (alfaGrad >= 45 && alfaGrad < 90) {
      eye.style.left = ((xO - heightB / 2 / Math.tan(alfa) )
        - offset).toString() + "px";
      eye.style.top = (topB).toString() + "px";
    }
  }

  if (e.clientX > xO && e.clientY < yO) {
    if (alfaGrad >= -90 && alfaGrad < -45) {
      eye.style.left = ((xO - heightB / 2 / Math.tan(alfa))
        - offset ).toString() + "px";
      eye.style.top = (topB).toString() + "px";
    } else if (alfaGrad >= -45 && alfaGrad < 0) {
      eye.style.left = (rightB - offset).toString() + "px";
      eye.style.top = ((yO + Math.tan(alfa) * widthB  / 2)
        - offset).toString() + "px";
    }
  }

  if (e.clientX > xO && e.clientY > yO) {
    if (alfaGrad >= 0 && alfaGrad < 45) {
      eye.style.left = (rightB - offset).toString() + "px";
      eye.style.top = ((yO + widthB * Math.tan(alfa) / 2)
        - offset ).toString() + "px";
    } else if (alfaGrad > 45 && alfaGrad < 90) {
      eye.style.left = ((xO + heightB / 2 / Math.tan(alfa))
        - offset ).toString() + "px";
      eye.style.top = (bottomB - offset).toString() + "px";
    }
  }
  if (e.clientX < xO && e.clientY > yO) {
    if (alfaGrad >= -90 && alfaGrad < -45) {
      eye.style.left = ((xO + heightB / 2 / Math.tan(alfa) )
        - offset).toString() + "px";
      eye.style.top = (bottomB - offset).toString() + "px";
    } else if (alfaGrad >= -45 && alfaGrad < 0) {
      eye.style.left = (leftB).toString() + "px";
      eye.style.top = ((yO - Math.tan(alfa) * widthB  / 2)
        - offset).toString() + "px";
    }
  }
}

let leftPupil = cursorPos;
let rightPupil = cursorPos;

function throttleEyes(e) {
  leftPupil(e, centerLeftX, centerLeftY, leftBorderLeftEye,
    rightBorderLeftEye, catLeftEye);
  rightPupil(e, centerRightX, centerRightY, leftBorderRightEye,
    rightBorderRightEye, catRightEye);
}

document.addEventListener('mousemove', throttle(throttleEyes, delay));






