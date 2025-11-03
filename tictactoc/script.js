const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const btn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//lets the game begin
function initGame() {
    currentPlayer = 'X';
    gameGrid = ['', '', '', '', '', '', '', '', ''];
    // ui ko empty bhi karna padega boxes ko
    boxes.forEach((box,index) => {
        box.innerText = '';
        boxes[index].style.pointerEvents = 'all'; // to allow clicking on boxes
        //one more thing is missing, initialise box ith css properties again
        box.classList = `box box${index + 1}`; // reset the class to default
    });
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();


function checkGameOver() {
    let answer = '';
    winningPositions.forEach((position) => {
        //all 3 boxes should be non-ampty and exactly same in value
        if (gameGrid[position[0]] !== '' && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[0]] === gameGrid[position[2]]) {
            answer = gameGrid[position[0]];
        }
    });
    if (answer !== '') {
        gameInfo.innerText = `Player ${answer} has won!`;
        boxes.forEach((box) => {
            box.style.pointerEvents = 'none'; // disable further clicks
        });
    } else if (!gameGrid.includes('')) {
        gameInfo.innerText = `It's a draw!`;
    }
}

function swapTurn() {
    //swap the player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    //update the game info
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index) {
    if (gameGrid[index] === '') {
        gameGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        // boxes[index].classList.add(`player${currentPlayer}`);
        //swap the player
        swapTurn();
        //check for a win or a draw
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});
newGameBtn.addEventListener('click',initGame);
