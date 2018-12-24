'use strict';

function callback(data) {

  const pic = document.querySelector('[data-pic]');
  const name = document.querySelector('[data-name]');
  const position = document.querySelector('[data-position]');
  const description = document.querySelector('[data-description]')
  const technologies = document.querySelector('[data-technologies]');

  pic.src = data.pic;
  name.textContent = data.name;
  position.textContent = data.position;
  description.textContent = data.description;

  let url = `https://neto-api.herokuapp.com/profile/${data.id}/technologies`;

function loadData(url) {
  let functionName = (() => {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let callbackName;
    for (let i = 0; i < 16; i++) {
      callbackName += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return callbackName;
  })();

    return new Promise((done, fail) => {
      window[functionName] = done;
      let script = document.createElement('script');
      script.src = `${url}?jsonp=${functionName}`;
      document.body.appendChild(script);
    });
  }

  loadData(url)
    .then((data) => data.forEach(function (item) {
      let technologiesHtml = `<span class="devicons devicons-${item}"></span>`;
      technologies.innerHTML += technologiesHtml;
    })
    )
    .then(() => document.querySelector('.content').style.display = "initial");
};

let url = "https://neto-api.herokuapp.com/profile/me";
let script = document.createElement('script');
script.src = url;

document.body.appendChild(script);
