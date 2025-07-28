const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;
let cells = Array(9).fill("");

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = '';
  cells = Array(9).fill("");
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = "Player X's Turn";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick, { once: true });
    board.appendChild(cell);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || cells[index] !== "") return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell !== "")) {
    statusText.textContent = "It's a Draw! 🤝";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin(player) {
  return winningCombinations.some(combination =>
    combination.every(index => cells[index] === player)
  );
}

restartBtn.addEventListener('click', createBoard);

createBoard();