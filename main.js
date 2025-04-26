const game = document.createElement('div');
game.style.display = 'grid';
game.style.gridTemplateColumns = 'repeat(3, 100px)';
game.style.gap = '5px';
document.body.appendChild(game);

let FirstPlayer = true;
let board = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1]
];

for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.style.width = '100px';
  cell.style.height = '100px';
  cell.style.background = '#eee';
  cell.style.display = 'flex';
  cell.style.alignItems = 'center';
  cell.style.justifyContent = 'center';
  cell.style.fontSize = '40px';
  cell.style.cursor = 'pointer';

  const row = Math.floor(i / 3);
  const col = i % 3;

  cell.dataset.row = row;
  cell.dataset.col = col;

  cell.addEventListener('click', handleClick);

  game.appendChild(cell);
}

function handleClick(event) {
  const clickedCell = event.target;
  const row = Number(clickedCell.dataset.row);
  const col = Number(clickedCell.dataset.col);

  console.log('Clicked row:', row, 'col:', col);


  if (board[row][col] === -1) {
    if (FirstPlayer) {
        board[row][col] = 1;
        clickedCell.textContent = 'X';
        FirstPlayer = true;
    } else {
        board[row][col] = 0;
        FirstPlayer = false;
        clickedCell.textContent = 'O';
    }
    FirstPlayer = !FirstPlayer;
    
  }
  checkWinners();

  checkDraw();
}

function checkWinners() {
    for (let row = 0; row < 3; row++) {
        if (board[row][0] === board[row][1] && board[row][1] === board[row][2] && board[row][0] !== -1) {
                if (FirstPlayer) {
                    console.log("O win");
                    setTimeout(() => restartGame(), 2000);
                } else {
                    console.log("X win");
                    setTimeout(() => restartGame(), 2000);
                }
        }
      }
    
      for (let col = 0; col < 3; col++) {
        if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] !== -1) {
            if (FirstPlayer) {
                console.log("O win");
                setTimeout(() => restartGame(), 2000);
            } else {
                console.log("X win");
                setTimeout(() => restartGame(), 2000);
            }
        }
      }
    
      if ((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] !== -1) ||
       (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[1][1] !== -1)) {
        if (FirstPlayer) {
            console.log("O win");
            setTimeout(() => restartGame(), 2000);
        } else {
            console.log("X win");
            setTimeout(() => restartGame(), 2000);
        }
        
      }
}

function checkDraw() {
    let filledCells = 0;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] !== -1) {
          filledCells++;
        }
      }
    }
    if (filledCells === 9) {
      console.log("Draw");
      setTimeout(() => restartGame(), 2000);
    }
  }


function SwitchBtn() {
    FirstPlayer = !FirstPlayer;
}

function restartGame() {
    board = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1]
    ];
  
    const cells = document.querySelectorAll('div');
  cells.forEach(cell => {
    if (cell !== game) { 
      cell.textContent = '';
    }
  });
  
 
    FirstPlayer = true;
  }
  