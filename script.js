console.log('script is running');
const checkBoard = document.querySelector("checkBoard");
    // console.log(checkBoard)

// this const is for creating movement rules
// i will use this along with some more math to calculate legal moves for the checkers... i.e. divclass#2 += (width + 1) or += (width -1) to check diaganal adjacent squares and see if a child element is present.
const width = 8;

let playerTurn = 'white';
// I want to be able to reverse the div ids from 0-63 to 63-0 so that when the player turn changes, the div ids will change and one function can be used to check legal moves  

//these constants below allow me to have access to the divs i created in html in this js//
//I want to be able to access the id of each element within the allSquares array so that I can drag an element to a new div and have it change its location to the new id// 
const p2Pieces = document.querySelectorAll(".p2");
    console.log(p2Pieces);
// this const contains an array of player twos pieces

const p1Pieces = document.querySelectorAll(".p1");
    console.log(p1Pieces);
// this const contains an array of player ones pieces

const allSquares = document.querySelectorAll(".square");
    console.log(allSquares);

//this const contains all the 64 squares of the gameboard and their child elements (player pieces)

allSquares.forEach((square) => { 
    square.addEventListener('onclick', onclick);
});

let startPieceId
let clickBegin

function onClick(e) {
    startPieceId = e.target.parentNode.getAttribute('square-id');
    console.log(startPieceId);
    clickBegin = e.target;
}

function dragOver(e) {
    e.preventDefault();
    console.log(e.target);
}

function dragDrop(e) {
    e.stopPropagation();
    console.log(e.target);
    e.target.append(dragElement);
    const correctTurn = dragElement.classList.contains(playerTurn);
    const taken = e.target.classList.contains('piece');
    const legal = checkIfLegal(e.target);
    const opponentTurn = playerTurn === 'black' ? 'white' : 'black';
    const takenByOpponent = e.target.classList.contains(opponentTurn);

    if (correctTurn) {
        if (takenByOpponent && legal) {
            e.target.parentNode.append(dragElement);
            e.target.remove();
            changePlayer();
            return;
        }
        if (taken && !takenByOpponent) {
            return;
        }
        if (legal) {
            e.target.append(dragElement);
            changePlayer();
            return;
        }
    }
}

function changePlayer() {  
    if (playerTurn === 'white') {
        reverseIds();
        playerTurn = 'black';
    } else {
        revertIds();
        playerTurn = 'white';
    }
}

function reverseIds() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, i) => 
        square.setAttribute('square-id', (width * width -1) - i));
}

function revertIds() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, i) => square.setAttribute('square-id', i));
}

function checkIfLegal(target) {
    const targetId = Number(target.getAttribute('square-Id')) || Number(target.parentNode.getAttribute('square-id'));
    const startId = Number(startPieceId);
    const piece = dragElement.id;
}

function pieceMoves() {
    if (playerTurn === 'white') {
        startId + width - 1 === targetId ||
        startId + width + 1 === targetId 
    } else {
        startId - width - 1 === targetId ||
        startId - width + 1 === targetId 
    }
}

function kingMoves() { 
    if (p1Pieces || p2Pieces === 'piece.p1.k' || 'piece.p2.k' ) {
        startId + width - 1 === targetId ||
        startId + width + 1 === targetId ||
        startId - width - 1 === targetId ||
        startId - width + 1 === targetId
    }
} 

function makeKingP2() {
    if (p2Pieces.id === 0 || 1 || 2 || 3 || 4 || 5 || 6 || 7) {
        p2Pieces.append(".k")
    }
}

function makeKingP1() {
    if (p1Pieces.id === 63 || 62 || 61 || 60 || 59 || 58 || 57 || 56) {
        p1Pieces.append(".k")
    }
}

//  A move consists of moving a piece diagonally to an adjacent unoccupied square.
//  If the adjacent square contains an opponent's piece, 
//  and the square immediately beyond it is vacant, 
//  the piece may be captured (and removed from the game) by jumping over it.//
