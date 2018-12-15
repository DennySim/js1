'use strict';

function handleTableClick(event) {
  if (event.target.tagName !== 'TH') {
    return;
  }
  if (!(event.target.hasAttribute('data-dir'))) {
    event.target.setAttribute('data-dir', 1);
  } else if (event.target.dataset.dir === '1') {
    event.target.dataset.dir = -1;
  } else {
    event.target.dataset.dir = 1;
  }
  tableElement.setAttribute('data-sort-by', event.target.dataset.propName);
  sortTable(event.target.dataset.propName, event.target.dataset.dir);
}

const tableElement = document.querySelector('table');
tableElement.addEventListener('click', handleTableClick);