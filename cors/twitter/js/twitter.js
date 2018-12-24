'use strict';

function callback(data) {
  const wallpaper = document.querySelector('[data-wallpaper]');
  const username = document.querySelector('[data-username]');
  const description = document.querySelector('[data-description]')
  const pic = document.querySelector('[data-pic]');
  const followers = document.querySelector('[data-followers]');
  const following = document.querySelector('[data-following]');
  const tweets = document.querySelector('[data-tweets]');

  wallpaper.src = data.wallpaper;
  username.textContent = data.username;
  description.textContent = data.description;
  pic.src = data.pic;
  tweets.textContent = data.tweets;
  followers.textContent = data.followers;
  following.textContent = data.following;
}

const url = "https://neto-api.herokuapp.com/twitter/jsonp";

//let script = document.scripts[0].cloneNode();
let script = document.createElement('script');
script.src = url;

document.body.appendChild(script);
