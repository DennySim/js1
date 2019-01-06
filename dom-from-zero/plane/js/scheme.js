'use strict';

const url = "https://neto-api.herokuapp.com/plane/";
const acSelect = document.querySelector('#acSelect');
const btnSeatMap = document.querySelector('#btnSeatMap');
const btnSetFull = document.querySelector('#btnSetFull');
const btnSetEmpty = document.querySelector('#btnSetEmpty');
const seatMapDiv = document.querySelector('#seatMapDiv');
const seatMapTitle = document.querySelector('#seatMapTitle');
const totalPax = document.querySelector('#totalPax');
const totalAdult = document.querySelector('#totalAdult');
const totalHalf = document.querySelector('#totalHalf');

let planeType = acSelect.firstElementChild.value;
acSelect.value = acSelect.firstElementChild.value;
btnSetFull.disabled = true;
btnSetEmpty.disabled = true;

acSelect.onchange = function (e) {
  planeType = e.currentTarget.value;
  planeTypeRequest()
}

function clear(e) {
  e.preventDefault();
  totalHalf.textContent = 0;
  totalAdult.textContent = 0;
  totalPax.textContent = 0;
}

btnSeatMap.onclick = function (e) {

  clear(e);
  seatMapTitle.textContent = `${plane.title} (${plane.passengers} пассажиров)`;
  createSeatRows();
  btnSetFull.disabled = false;
  btnSetEmpty.disabled = false;

  document.querySelectorAll('.seat').forEach((seat) => {
    seat.addEventListener('click', e => {
      if (e.currentTarget.classList.contains('adult') ||
        e.currentTarget.classList.contains('half')) {
        e.currentTarget.classList.remove('half');
        e.currentTarget.classList.remove('adult');
      } else if (e.altKey) {
        e.currentTarget.classList.remove('adult');
        e.currentTarget.classList.add('half');
      } else {
        e.currentTarget.classList.remove('half');
        e.currentTarget.classList.add('adult');
      }

      totalAdult.textContent = document.querySelectorAll('.adult').length;
      totalHalf.textContent = document.querySelectorAll('.half').length;
      totalPax.textContent = +(totalAdult.textContent) + +(totalHalf.textContent);

    })
  })
};

btnSetEmpty.onclick = function (e) {
  clear(e);
  const setSeatAdult = document.querySelectorAll('.seat');
  setSeatAdult.forEach(seat => seat.classList.remove('adult', 'half'))
};

btnSetFull.onclick = function (e) {
  e.preventDefault();
  const setSeatAdult = document.querySelectorAll('.seat');
  setSeatAdult.forEach(seat => seat.classList.add('adult'))
  totalAdult.textContent = plane.passengers;
  totalPax.textContent = totalAdult.textContent;
};

let plane;
function planeScheme(data) {
  plane = data;
}

function planeTypeRequest() {
  fetch(url + planeType)
    .then(res => res.json())
    .then(planeScheme)
}

planeTypeRequest();

function createSeatRows() {

  function createSeatRow(i) {

    const seatingRow = document.createElement('div');
    seatingRow.classList.add("row", "seating-row", "text-center");
    seatMapDiv.appendChild(seatingRow);
    const rowNumber = document.createElement('div');
    seatingRow.appendChild(rowNumber);
    rowNumber.classList.add("col-xs-1", "row-number");
    const h2 = document.createElement('h2');
    rowNumber.appendChild(h2);
    h2.textContent = `${i + 1}`;
    const rowNumberLeft = document.createElement('div');
    const rowNumberRight = document.createElement('div');
    const noSeat = document.createElement('div');

    switch(rows[i]) {
      case 6:
        seatingRow.appendChild(rowNumberLeft);
        rowNumberLeft.classList.add("col-xs-5");
        seatingRow.appendChild(rowNumberRight);
        rowNumberRight.classList.add("col-xs-5");

        for (let i = 0; i < parseInt(seats6.length); i++) {
          let seat = document.createElement('div');
          seat.classList.add("col-xs-4", "seat");
          rowNumberLeft.appendChild(seat);

          if (i < 3) {
            rowNumberLeft.appendChild(seat);
            seat.classList.add("col-xs-4", "seat");
          }
          if ( i > 2) {
            rowNumberRight.appendChild(seat);
            seat.classList.add("col-xs-4", "seat");
          }

          const seatLabel = document.createElement('span');
          seat.appendChild(seatLabel);
          seatLabel.classList.add("seat-label");
          seatLabel.textContent = seats6[i];
        }

        break
      case 4:
        seatingRow.appendChild(rowNumberLeft);
        rowNumberLeft.classList.add("col-xs-5");
        seatingRow.appendChild(rowNumberRight);
        rowNumberRight.classList.add("col-xs-5");

        rowNumberLeft.appendChild(noSeat);
        noSeat.classList.add("col-xs-4", "no-seat");

        for (let i = 0; i < parseInt(seats4.length); i++) {
          let seat = document.createElement('div');
          seat.classList.add("col-xs-4", "seat");
          rowNumberLeft.appendChild(seat);

          if (i < 2) {
            rowNumberLeft.appendChild(seat);
            seat.classList.add("col-xs-4", "seat");
          }
          if ( i > 1) {
            rowNumberRight.appendChild(seat);
            seat.classList.add("col-xs-4", "seat");
          }

          const seatLabel = document.createElement('span');
          seat.appendChild(seatLabel);
          seatLabel.classList.add("seat-label");
          seatLabel.textContent = seats4[i];

        }
        break
      case 0:
        seatingRow.appendChild(noSeat);
        noSeat.classList.add("col-xs-4", "no-seat");
        break
    }
  }

  const rows = plane.scheme;
  const seats6 = plane.letters6;
  const seats4 = plane.letters4;

  while (seatMapDiv.firstChild) {
    seatMapDiv.removeChild(seatMapDiv.firstChild);
  }

  for (let i = 0; i < rows.length; i++) {
    createSeatRow(i);
  }
}