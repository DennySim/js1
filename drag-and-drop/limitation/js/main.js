'use strict';

const block = document.querySelector('.block')
const message = document.querySelector('.message');
const textarea = document.querySelector('textarea');

textarea.addEventListener('focusin', focus);
textarea.addEventListener('focusout', blur);
textarea.addEventListener('input', input);
textarea.addEventListener('keydown', debounce(view, 2000));

function focus() {
    block.classList.add('active');
}

function blur() {
    block.classList.remove('active');
    message.classList.remove('view');
}
function input() {
    block.classList.add('active');
    message.classList.remove('view');
}

function view() {
    block.classList.remove('active');
    message.classList.add('view');
}

function debounce(callback, delay) {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            callback();
        }, delay);
    };
};
