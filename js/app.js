/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/
function init() {
    board = Array(9).fill('');
    turn = 'X';
    winner = false;
    tie = false;
    console.log('Game initialized!');
    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((val, idx) => {
        const square = squareEls[idx];
        square.textContent = val;
    });
}

function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn}'s turn!`;
    } else if (!winner && tie) {
        messageEl.textContent = "It's a tie!";
    } else {
        messageEl.textContent = `Congratulations, ${turn} wins!`;
    }
}

function handleClick(evt) {
    const squareIndex = parseInt(evt.target.id);
    if (board[squareIndex] || winner) return;
    
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index) {
    board[index] = turn;
    console.log(board);
}

function checkForWinner() {
    if (board[0] && board[0] === board[1] && board[0] === board[2]) {
        winner = true;
    } else if (board[3] && board[3] === board[4] && board[3] === board[5]) {
        winner = true;
    } else if (board[6] && board[6] === board[7] && board[6] === board[8]) {
        winner = true;
    } else if (board[0] && board[0] === board[3] && board[0] === board[6]) {
        winner = true;
    } else if (board[1] && board[1] === board[4] && board[1] === board[7]) {
        winner = true;
    } else if (board[2] && board[2] === board[5] && board[2] === board[8]) {
        winner = true;
    } else if (board[0] && board[0] === board[4] && board[0] === board[8]) {
        winner = true;
    } else if (board[2] && board[2] === board[4] && board[2] === board[6]) {
        winner = true;
    }
    console.log('Winner:', winner);
}

function checkForTie() {
    if (winner) return;
    if (!board.includes('')) {
        tie = true;
    } else {
        tie = false;
    }
    console.log('Tie:', tie);
}

function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'X' ? 'O' : 'X';
    console.log('Turn:', turn);
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);

// Initialize the game
document.addEventListener('DOMContentLoaded', init);