'use strict';

const BtnGrid = () => {
  let elem = '';
  let i = 0;
  while (i < 100) {
    elem += '<button class="grid-item"></button>';
    i++;
  }
  return elem;
};

const btnElm = document.querySelector('#grid');
btnElm.innerHTML = BtnGrid();
