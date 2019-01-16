'use strict';

const app = document.querySelector('.app'),
  controls = app.querySelector('.controls'),
  errorMessage = app.querySelector('#error-message'),
  takePhoto = controls.querySelector('#take-photo'),
  photoList = document.querySelector('.list'),
  canvas = document.createElement('canvas'),
  ctx = canvas.getContext('2d'),
  audio = new Audio('https://raw.githubusercontent.com/netology-code/' +
    'hj-homeworks/master/media/photo-booth/audio/click.mp3');

let video;

controls.style.display = 'block';
navigator.mediaDevices
  .getUserMedia({video: true, audio: false})
  .then(live)
  .catch(e => errorMessage.textContent = e.name);

function live(stream) {
  video = document.createElement('video');
  app.appendChild(video);
  video.srcObject = stream;
  video.play();
}

takePhoto.addEventListener('click', function(e) {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  audio.play();
  createFigure(canvas.toDataURL(), 'snapshot.png');
});

function createFigure(photoSrc) {

  let props = [
    [{'href': photoSrc, 'download': 'snapshot.png'},
     {'class': "material-icons", 'textContent': 'file_download'}
    ],
    [{}, {'class': "material-icons", 'textContent': 'file_upload',
      'onclick': 'uploadPhoto(this)'}
    ],
    [{}, {'class': "material-icons", 'textContent': 'delete',
      'onclick': 'deletePhoto(this)'}
    ]
  ];

  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = photoSrc;
  figure.appendChild(img);

  const figcaption = document.createElement("figcaption");
  figure.appendChild(figcaption);

  for (let prop of props) {
    const a = document.createElement("a");
    figcaption.appendChild(a);
    const i = document.createElement("i");
    a.appendChild(i);

    Object.keys(prop[0]).forEach(attr => {a.setAttribute(attr, prop[0][attr])});

    Object.keys(prop[1]).forEach(attr => {
      if (attr === 'textContent') {
        const textNode = document.createTextNode(prop[1][attr]);
        i.appendChild(textNode);
      }
      if (attr === 'class') {
        i.classList.add(prop[1][attr]);
      }
      if (attr === 'onclick') {
        i.setAttribute(attr, prop[1][attr])
      }
    })
  }
  photoList.insertBefore(figure, photoList.firstChild);
}

function closestParent(child) {
  return child.closest("figure");
}

function deletePhoto(child) {
  const node = closestParent(child);
  node.parentNode.removeChild(node);
}

function uploadPhoto(child) {
  const node = closestParent(child);
  const img = node.querySelector('img');
  const formData = new FormData();

  ctx.drawImage(img, 0, 0);
  canvas.toBlob(blob => {
    formData.append('image', blob);

    fetch('https://neto-api.herokuapp.com/photo-booth', {
      method: 'POST',
      body: formData
    })
      .then(data => console.log(data.url))
  });
}
