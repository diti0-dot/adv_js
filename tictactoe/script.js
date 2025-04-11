const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const gameBoard = document.getElementById("gameBoard");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

// Winning combinations
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

// Create board
function createBoard() {
    gameBoard.innerHTML = "";
    board.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleMove);
        gameBoard.appendChild(cell);
    });
}

// Handle move
function handleMove(event) {
    const index = event.target.dataset.index;
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.includes("")) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    }
}

// Check for win
function checkWin() {
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

// Reset game
resetBtn.addEventListener("click", () => {
    board.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    createBoard();
});

createBoard();
