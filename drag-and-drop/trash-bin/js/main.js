'use strict';

const trashBin = document.querySelector('#trash_bin');

let movedPiece = null,
  bounds,
  movedPieceX,
  movedPieceY;

document.addEventListener('mousedown', e => {
  if (e.target.classList.contains('logo')) {
    movedPiece = e.target;
    movedPieceX = movedPiece.style.left;
    movedPieceY = movedPiece.style.top;
    bounds = movedPiece.getBoundingClientRect();
  }
})

document.addEventListener('mousemove', e => {
  if (movedPiece) {
    movedPiece.style.left = `${e.pageX - bounds.width / 2}px`;
    movedPiece.style.top = `${e.pageY - bounds.height / 2}px`;
    movedPiece.classList.add('moving');
  }
})

document.addEventListener('mouseup', e => {
  if (movedPiece) {
    const trashCan = document
      .elementFromPoint(e.clientX, e.clientY)
      .closest('#trash_bin')
    if (trashCan) {
      movedPiece.style.display = "none";
    } else {
      movedPiece.classList.remove('moving');
      movedPiece.style.left = movedPieceX;
      movedPiece.style.top = movedPieceY;
      movedPiece = null;
    }
  }
});
