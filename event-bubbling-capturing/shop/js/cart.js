'use strict';

function handleItemsClick(event) {
  if (!(event.target.classList.contains('add-to-cart'))) {
    return;
  }
  let item = {'title': event.target.dataset.title,
              'price': event.target.dataset.price
  };
  addToCart(item);
}

const main = document.querySelector('main');
main.addEventListener('click', handleItemsClick);