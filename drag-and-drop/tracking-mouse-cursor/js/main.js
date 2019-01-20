'use strict';

const cat = document.querySelector('.cat');
const catLeftEyePosition = document.querySelector('.cat_position_for_left_eye');
const catRightEyePosition = document.querySelector('.cat_position_for_right_eye');
const catLeftEye = document.querySelector('.cat_eye_left');
const catRightEye = document.querySelector('.cat_eye_right');

const html = document.querySelector('html');
const docHeigth = html.clientHeight;
const docWidth = document.body.clientWidth;

let ratioX = (catLeftEyePosition.clientWidth -
  catLeftEye.clientWidth * 3) / docWidth;
let ratioY = (catLeftEyePosition.clientHeight -
  catLeftEye.clientWidth * 3)/ docHeigth;

const rectLeftPosX = catLeftEyePosition.getBoundingClientRect().x;
const rectRightPosX = catRightEyePosition.getBoundingClientRect().x;
const rectLeftPosY = catLeftEyePosition.getBoundingClientRect().y;
const rectRightPosY = catRightEyePosition.getBoundingClientRect().y;

catLeftEye.style.position = "fixed";
catRightEye.style.position = "fixed";
catLeftEye.style.left = (rectLeftPosX).toString() + "px";
catLeftEye.style.top = (rectLeftPosY).toString() + "px";
catRightEye.style.left = (rectRightPosX).toString() + "px";
catRightEye.style.top = (rectRightPosY).toString() + "px";

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

const throttleEyes = throttle(function cursorPos(e) {

  catLeftEye.style.left = (rectLeftPosX + e.clientX * ratioX).toString() + "px";
  catLeftEye.style.top = (rectLeftPosY + e.clientY * ratioY).toString() + "px";
  catRightEye.style.left = (rectRightPosX + e.clientX * ratioX).toString() + "px";
  catRightEye.style.top = (rectRightPosY + e.clientY * ratioY).toString() + "px";

}, delay)

document.addEventListener('mousemove', throttleEyes);






