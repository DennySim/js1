'use strict';
let pathToPicFolder = 'i/';
let picList = [
    'airmax.png',
    'airmax-top-view.png',
    'airmax-playground.png',
    'airmax-on-foot.png',
    'airmax-jump.png'
];

function showSlidingPic() {
  let delay = 5000;
  for (let j = 0; j < picList.length; j++) {

  (function (j) {
    setTimeout(function () {
      document.getElementById('slider').src = pathToPicFolder + picList[j];
    }, delay * j);
  })(j);
  }
  setTimeout(showSlidingPic, (picList.length - 1) * delay)
}
showSlidingPic();

