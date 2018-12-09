function getPriceFormatted(value) {
  return  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const buttons = document.querySelectorAll('.add');
let cart = document.querySelector('#cart-count');
let cartTotalPrice = document.querySelector('#cart-total-price');

let goodsQuantity = 0;
let goodsTotalPrice = 0;

function changeQuantity() {
  goodsQuantity++;
  cart.innerHTML = goodsQuantity;
}

function changeSum() {
  goodsTotalPrice += Number(this.dataset.price);
  cartTotalPrice.innerHTML = goodsTotalPrice;
  getPriceFormatted(goodsTotalPrice);
}

for (let btn of buttons) {
  btn.addEventListener('click', changeQuantity);
  btn.addEventListener('click', changeSum);
}
