let xWins = 0;
let oWins = 0;
let FirstPlayer = true;
let boardSize = 3;
let board = [];

const game = document.createElement('div');
document.body.appendChild(game);

const scoreDisplay = document.createElement('div');
scoreDisplay.style.marginBottom = '10px';
scoreDisplay.style.fontSize = '20px';
document.body.insertBefore(scoreDisplay, game);

function createBoard(size) {
    game.innerHTML = '';
    game.style.display = 'grid';
    game.style.gridTemplateColumns = `repeat(${size}, 100px)`;
    game.style.gap = '5px';

    board = Array.from({ length: size }, () => Array(size).fill(-1));

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.style.width = '100px';
        cell.style.height = '100px';
        cell.style.background = '#eee';
        cell.style.display = 'flex';
        cell.style.alignItems = 'center';
        cell.style.justifyContent = 'center';
        cell.style.fontSize = '40px';
        cell.style.cursor = 'pointer';

        const row = Math.floor(i / size);
        const col = i % size;

        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', handleClick);

        game.appendChild(cell);
    }
    updateScore();
}

function handleClick(event) {
    const clickedCell = event.target;
    const row = Number(clickedCell.dataset.row);
    const col = Number(clickedCell.dataset.col);

    if (board[row][col] !== -1) return;

    board[row][col] = FirstPlayer ? 1 : 0;
    clickedCell.textContent = FirstPlayer ? 'X' : 'O';
    FirstPlayer = !FirstPlayer;

    if (checkWinners()) return;
    checkDraw();
}

function checkWinners() {
    const size = board.length;

    for (let i = 0; i < size; i++) {
        if (board[i].every(cell => cell === board[i][0] && cell !== -1)) {
            declareWinner(board[i][0]);
            return true;
        }

        if (board.every(row => row[i] === board[0][i] && row[i] !== -1)) {
            declareWinner(board[0][i]);
            return true;
        }
    }

    if (board.every((row, idx) => row[idx] === board[0][0] && row[idx] !== -1)) {
        declareWinner(board[0][0]);
        return true;
    }
    if (board.every((row, idx) => row[size - 1 - idx] === board[0][size - 1] && row[size - 1 - idx] !== -1)) {
        declareWinner(board[0][size - 1]);
        return true;
    }

    return false;
}

function checkDraw() {
    if (board.flat().every(cell => cell !== -1)) {
        setTimeout(() => alert("Draw"), 100);
        setTimeout(() => createBoard(boardSize), 1000);
    }
}

function declareWinner(winner) {
    winner === 1 ? xWins++ : oWins++;
    setTimeout(() => alert(winner === 1 ? "X wins!" : "O wins!"), 100);
    updateScore();
    setTimeout(() => createBoard(boardSize), 1000);
}

function updateScore() {
    scoreDisplay.textContent = `X: ${xWins} - O: ${oWins}`;
}

document.getElementById('restart').addEventListener('click', () => {
  xWins = 0;
  oWins = 0;
  updateScore();
  createBoard(boardSize);
});

document.getElementById('boardSize').addEventListener('change', (e) => {
  boardSize = Number(e.target.value);
  createBoard(boardSize);
});

createBoard(boardSize);

  