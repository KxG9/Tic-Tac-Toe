function gameBoard() {
  const row = 3;
  const column = 3;
  const board = [];

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(" ");
    }
  }
  return { board };
}

function createGrid() {
  const boardGrid = document.querySelector(".board");
  const cells = [];

  for (let i = 0; i < 9; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    boardGrid.appendChild(cell);
    cells.push(cell);
  }
  return { cells };
}

function createPlayer(name, mark) {
  return { name, mark };
}

const myBoard = gameBoard();

const myCells = createGrid();

let p1 = prompt("What is your name: ");
let m1 = prompt("What Mark would you like to use? X/O: ");
let m2;

const updateGrid = () => {
  myCells.cells.forEach((cell, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    cell.innerText = myBoard.board[row][col];
  });
};

const resetGrid = () => {
  if (winCondition()) {
    function resetGrid() {
      for (let i = 0; i < myBoard.board.length; i++) {
        for (let j = 0; j < myBoard.board[i].length; j++) {
          myBoard.board[i][j] = " ";
        }
      }
    }
    updateGrid();
  }
};
const gameControl = () => {
  if (m1 == "X") {
    m2 = "O";
  } else {
    m2 = "X";
  }

  const winCondition = () => {
    const cell1 = myBoard.board[0][0];
    const cell2 = myBoard.board[0][1];
    const cell3 = myBoard.board[0][2];
    const cell4 = myBoard.board[1][0];
    const cell5 = myBoard.board[1][1];
    const cell6 = myBoard.board[1][2];
    const cell7 = myBoard.board[2][0];
    const cell8 = myBoard.board[2][1];
    const cell9 = myBoard.board[2][2];

    if (cell1 != " " && cell1 === cell2 && cell2 === cell3) return true;
    if (cell4 != " " && cell4 === cell5 && cell5 === cell6) return true;
    if (cell7 != " " && cell7 === cell8 && cell8 === cell9) return true;
    if (cell1 != " " && cell1 === cell4 && cell4 === cell7) return true;
    if (cell2 != " " && cell2 === cell5 && cell5 === cell8) return true;
    if (cell3 != " " && cell3 === cell6 && cell6 === cell9) return true;
    if (cell1 != " " && cell1 === cell5 && cell5 === cell9) return true;
    if (cell3 != " " && cell3 === cell5 && cell5 === cell7) return true;

    return false;
  };

  const isBoardFull = () => {
    for (let i = 0; i < myBoard.board.length; i++) {
      for (let j = 0; j < myBoard.board[i].length; j++) {
        if (myBoard.board[i][j] === " ") {
          return false;
        }
      }
    }
    return true;
  };

  const markLocation = (row, col, mark) => {
    if (myBoard.board[row][col] === " ") {
      myBoard.board[row][col] = mark;
      updateGrid();

      if (winCondition()) {
        alert(`${mark === m1 ? p1 : "CPU"} wins!`);
        return true;
      }
      if (isBoardFull()) {
        alert("It's a tie!");
        return true;
      }
    }
    return false;
  };

  myCells.cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      const row = Math.floor(index / 3);
      const col = index % 3;

      if (markLocation(row, col, m1)) return;

      let randomRow, randomCol;
      do {
        randomRow = Math.floor(Math.random() * 3);
        randomCol = Math.floor(Math.random() * 3);
      } while (myBoard.board[randomRow][randomCol] !== " ");

      markLocation(randomRow, randomCol, m2);
    });
  });
};
gameControl();
const player1 = createPlayer(p1, m1);
const player2 = createPlayer("CPU", m2);

console.log(`Welcome ${player1.name} your mark is ${player1.mark}`);
console.log(`Welcome ${player2.name} your mark is ${player2.mark}`);
