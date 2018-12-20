'use strict';

const swatches = document.querySelector('.swatches');
swatches.addEventListener('click', select);
const addToCartButton = document.querySelector('#AddToCart');
addToCartButton.addEventListener('click', addToCart);

fetch('https://neto-api.herokuapp.com/cart/colors', {
  method: 'get'
})
  .then(response => response.json())
  .then((data) => {
    let colorSwatch = document.querySelector('#colorSwatch');
    data.forEach((item) => {
      let available;
      let checked;

      if (item.isAvailable) {
        available = 'available';
      } else {
        available = 'soldout';
        checked = 'disabled';
      }
      colorSwatch.innerHTML += `<div data-value="${item.type}" 
        class="swatch-element color ${item.type} ${available}">
        <div class="tooltip">${item.title}</div>
        <input quickbeam="color" id="swatch-1-${item.type}" 
            type="radio" name="color" value="${item.type}" ${checked}>
        <label for="swatch-1-${item.type}" style="border-color: red;">
          <span style="background-color: ${item.code};"></span>
          <img class="crossed-out" 
            src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
        </label>
      </div>`
    })
    let defaultColor = document.querySelector('#colorSwatch > .available');
    defaultColor.querySelector('input').checked = true;
  });

fetch('https://neto-api.herokuapp.com/cart/sizes', {
  method: 'get'
})
  .then(response => response.json())
  .then((data) => {

    let sizeSwatch = document.querySelector('#sizeSwatch');
    data.forEach((item) => {
      let available;
      let checked;
      if (item.isAvailable) {
        available = 'available';
        checked = 'checked';
      } else {
        available = 'soldout';
        checked = 'disabled';
      }
      sizeSwatch.innerHTML += `<div data-value="${item.type}" 
        class="swatch-element plain ${item.type} ${available}">
          <input id="swatch-0-${item.type}" type="radio" 
            name="size" value="${item.type}" ${checked}>
          <label for="swatch-0-${item.type}">
            ${item.title}
            <img class="crossed-out" 
                src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
          </label>
        </div>`
    })
    let defaultSize = document.querySelector('#sizeSwatch > .available');
    defaultSize.querySelector('input').checked = true;

    if (localStorage.inputSelected) {
      let inputChecked = JSON.parse(localStorage.inputSelected),
        inputSwatches = document.querySelectorAll('.swatches input');

      inputChecked.forEach((item) => {
        inputSwatches[item].checked = true;
      })
    }
  });

function cart(data) {

  let quickCart = document.querySelector('#quick-cart');
  let totalPrice = 0;

  data.forEach((item) => {
    quickCart.innerHTML = `<div class="quick-cart-product 
      quick-cart-product-static" id="quick-cart-product-${item.id}" 
        style="opacity: 1;">
        <div class="quick-cart-product-wrap">
          <img src="${item.pic}" title="${item.title}">
          <span class="s1" style="background-color: #000; 
            opacity: .5">$${item.price}</span>
          <span class="s2"></span>
        </div>
        <span class="count hide fadeUp" 
          id="quick-cart-product-count-${item.id}">${item.quantity}</span>
        <span class="quick-cart-product-remove remove" 
          data-id="${item.id}"></span>
      </div>`;
    totalPrice = item.price * item.quantity;
  })

  quickCart.innerHTML += `<a id="quick-cart-pay" 
    quickbeam="cart-pay" class="cart-ico open">
      <span>
        <strong class="quick-cart-text">Оформить заказ<br></strong>
        <span id="quick-cart-price">${totalPrice}</span>
      </span>
    </a>`

  let quickCartPay = document.querySelector('#quick-cart-pay');
  if (data.length > 0) {
    quickCartPay.classList.add('open');
  } else {
    quickCartPay.classList.remove('open');
  }

  let removeButton = document.querySelector('.remove');
  removeButton.addEventListener('click', removeItem);
}

fetch('https://neto-api.herokuapp.com/cart', {
  method: 'get'
})
  .then(response => response.json())
  .then(data => cart(data))

function removeItem() {
  let removeItem = document.querySelector('.remove');
  let quickCart = document.querySelector('#quick-cart');
  let formData = new FormData();
  formData.append('productId', removeItem.dataset.id);
  fetch('https://neto-api.herokuapp.com/cart/remove', {
    method: 'post',
    body: formData
  })
    .then(response => response.json())
    .then((data) => {
      if (data.length > 0) {
        cart(data);
      } else {
        quickCart.innerHTML = '';
      }
    });
}

function select() {
  let inputSwatches = document.querySelectorAll('.swatches input');
  let inputChecked = [];

  inputSwatches.forEach(function (item, i) {
    if (item.checked) {
      inputChecked.push(i);
    }
  })
  localStorage.inputSelected = JSON.stringify(inputChecked);
}

function addToCart(e) {

  let addToCartForm = document.querySelector('#AddToCartForm');
  let formData = new FormData(addToCartForm);
  formData.append('productId', addToCartForm.dataset.productId);

  fetch('https://neto-api.herokuapp.com/cart', {
    method: 'post',
    body: formData
  })
    .then(response => response.json())
    .then(data => cart(data))

  e.preventDefault();
}








