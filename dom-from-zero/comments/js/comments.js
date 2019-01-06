'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  //const comments = list.map(createComment).join('');
  //commentsContainer.innerHTML += comments;
  const comments = list;
  comments.forEach(element => {
    commentsContainer.appendChild(createSaveElement(element));
  })
}

function createComment(comment) {
  return `<div class="comment-wrap">
    <div class="photo" title="${comment.author.name}">
      <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
    </div>
    <div class="comment-block">
      <p class="comment-text">
        ${comment.text.split('\n').join('<br>')}
      </p>
      <div class="bottom-comment">
        <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
        <ul class="comment-actions">
          <li class="complain">Пожаловаться</li>
          <li class="reply">Ответить</li>
        </ul>
      </div>
    </div>
  </div>`
}

function createSaveElement(comment) {

  const commentWrap = document.createElement('div');
  const commentAuthorName = document.createElement('div');
  const commentAuthorAvatar = document.createElement('div');
  const commentBlock = document.createElement('div');
  const commentParag = document.createElement('p');
  const commentBottom = document.createElement('div');
  const commentDate = document.createElement('div');
  const commentActions = document.createElement('ul');

  commentWrap.classList.add('comment-wrap');

  commentWrap.appendChild(commentAuthorName);
  commentAuthorName.classList.add('photo');
  commentAuthorName.setAttribute("title", `${comment.author.name}`);

  commentAuthorName.appendChild(commentAuthorAvatar);
  commentAuthorAvatar.classList.add('avatar');
  commentAuthorAvatar.style.backgroundImage = `url('${comment.author.pic}')`

  commentWrap.appendChild(commentBlock);
  commentBlock.classList.add('comment-block');

  commentBlock.appendChild(commentParag);
  commentParag.classList.add('comment-text');

  let commentBlocks = comment.text.split('\n');
  commentBlocks.forEach(function(commentText, index) {
    if (index === commentBlocks.length - 1) {
      commentParag.appendChild(document.createTextNode(commentText));
    } else {
      commentParag.appendChild(document.createTextNode(commentText));
      commentParag.appendChild(document.createElement('br'));
    }
  });

  commentBlock.appendChild(commentBottom);
  commentBottom.classList.add('bottom-comment');

  commentBottom.appendChild(commentDate);
  commentDate.classList.add('comment-date');
  commentDate.textContent = `${new Date(comment.date).toLocaleString('ru-Ru')}`;

  commentBottom.appendChild(commentActions);
  commentActions.classList.add('comment-actions');

  let actionComplain = document.createElement('li');
  commentActions.appendChild(actionComplain);
  actionComplain.classList.add('complain');
  actionComplain.textContent = "Пожаловаться";

  let actionreplay = document.createElement('li');
  commentActions.appendChild(actionreplay);
  actionreplay.classList.add('reply');
  actionreplay.textContent = "Ответить";

  return commentWrap;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
