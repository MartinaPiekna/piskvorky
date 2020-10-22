'use strict';

//tvorba hrací plochy
const BtnGrid = () => {
  let elem = '';
  let i = 0;
  while (i < 100) {
    elem += '<button class="grid-item"></button>';
    i++;
  }
  return elem;
};

// dodatečný element pro opacity
const InnerElm = () => {
  return '<div class="inner"></div>';
};

// přiřazení elementů do gridu
const btnElm = document.querySelector('#grid');
btnElm.innerHTML = InnerElm() + BtnGrid();

// výchozí tah hraje kolečko
let player = 'circle';

const FirstMove = () => {
  return `<img class="image__svg" src="./images/circle.svg"/>`;
};

const playerElm = document.querySelector('#player');
playerElm.innerHTML = FirstMove();

//tvorba svg elementu pro zobrazení střídání hráčů
const SvgElm = (player) => {
  return `<img class="image__svg" src="./images/${player}.svg"/>`;
};

const playerTurn = () => {
  const playerElm = document.querySelector('#player');
  playerElm.innerHTML = SvgElm(player);
};

const buttons = document.querySelectorAll('.grid-item');
// hra
const play = () => {
  for (let j = 0; j < buttons.length; j++) {
    const button = buttons[j];
    button.addEventListener('click', (e) => {
      if (button.classList !== `board__field--${player}`) {
        button.classList.add(`board__field--${player}`);
        if (player === 'cross') {
          if (isWinningMove(e.target)) {
            isWinningMove(e.target);
            if (confirm('Vyhrál hráč s křížkem.')) {
              location.reload();
            }
          }
          player = 'circle';
          playerTurn();
        } else {
          if (isWinningMove(e.target)) {
            isWinningMove(e.target);
            if (confirm('Vyhrál hráč s kolečkem.')) {
              location.reload();
            }
          }
          player = 'cross';
          playerTurn();
        }
        button.setAttribute('disabled', true);
      }
      //diagonalCheck(e.target);
    });
  }
};
play();

// hrací plocha
const boardSize = 10;
const fields = document.querySelectorAll('.grid-item');

//získej pozici z hrací plochy
const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

// získej políčko v řádku a sloupci
const getField = (row, column) => fields[row * boardSize + column];

// získej symbol hráče
const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

// ověření, zda je 5 stejných symbolů vedle sebe
const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // check doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // check doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // check nahoru
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // check dolu
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};

// nová hrací plocha
/*
const arrBoard = [];
for (let i = 0; i < boardSize; i++) {
  const newRow = [];
  for (let j = 0; j < boardSize; j++) {
    newRow.push(buttons[i * boardSize + j]);
  }
  arrBoard.push(newRow);
}

// check diagonálně
const diagonalCheck = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);
  const newOrigin = { row: origin.row, column: origin.column };

  for (let i = 1; i < symbolsToWin; i++) {
    newOrigin.row = i;
    newOrigin.column = i;
    const newSymbol = getSymbol(arrBoard[origin.row + i][origin.column + i]);
    console.log(newSymbol);
  }
};*/
