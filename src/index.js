'use strict';

// tvorba hrací plochy
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

// první tah hraje kolečko
let player = 'circle';

// fce pro první tah
const FirstMove = () => {
  return `<img class="image__svg" src="./images/circle.svg"/>`;
};

// na element hráče připojit element svg pro první tah
const playerElm = document.querySelector('#player');
playerElm.innerHTML = FirstMove();

// tvorba svg elementu pro zobrazení střídání hráčů
const SvgElm = (player) => {
  return `<img class="image__svg" src="./images/${player}.svg"/>`;
};

// fce pro střídání hráčů
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
    });
  }
};
play();

// hrací plocha
const boardSize = 10;
const fields = document.querySelectorAll('.grid-item');

// získej pozici z hrací plochy
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

  // jednička pro právě vybrané políčko v řádku
  let inRow = 1;

  // kontrola políčka vlevo
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // kontrola políčka vpravo
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

  // jednička pro právě vybrané políčko ve sloupci
  let inColumn = 1;

  // kontrola políčka nahoru
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // kontrola políčka dolu
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

  let diagonalRow;
  let diagonalColumn;

  // jednička pro právě vybrané políčko v diagonále vpravo
  let diagonalRight = 1;

  // diagonálně nahoru a vpravo
  diagonalRow = origin.row;
  diagonalColumn = origin.column;

  while (
    diagonalColumn < boardSize - 1 &&
    diagonalRow > 0 &&
    symbol === getSymbol(getField(diagonalRow - 1, diagonalColumn + 1))
  ) {
    diagonalRight += 1;
    diagonalRow -= 1;
    diagonalColumn += 1;
  }

  // diagonálně dolu a vlevo
  diagonalRow = origin.row;
  diagonalColumn = origin.column;

  while (
    diagonalRow < boardSize - 1 &&
    diagonalColumn > 0 &&
    symbol === getSymbol(getField(diagonalRow + 1, diagonalColumn - 1))
  ) {
    diagonalRight += 1;
    diagonalRow += 1;
    diagonalColumn -= 1;
  }

  if (diagonalRight >= symbolsToWin) {
    return true;
  }

  // jednička pro právě vybrané políčko v diagonále vlevo
  let diagonalLeft = 1;

  // diagonálně nahoru a vlevo
  diagonalRow = origin.row;
  diagonalColumn = origin.column;

  while (
    diagonalColumn < boardSize - 1 &&
    diagonalRow > 0 &&
    symbol === getSymbol(getField(diagonalRow - 1, diagonalColumn - 1))
  ) {
    diagonalLeft += 1;
    diagonalRow -= 1;
    diagonalColumn -= 1;
  }

  // diagonálně dolu a vpravo
  diagonalRow = origin.row;
  diagonalColumn = origin.column;

  while (
    diagonalRow < boardSize - 1 &&
    diagonalColumn > 0 &&
    symbol === getSymbol(getField(diagonalRow + 1, diagonalColumn + 1))
  ) {
    diagonalLeft += 1;
    diagonalRow += 1;
    diagonalColumn += 1;
  }

  if (diagonalLeft >= symbolsToWin) {
    return true;
  }

  return false;
};
