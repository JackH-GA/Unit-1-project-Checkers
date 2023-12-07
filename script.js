console.log('script is running')
const checkBoard = document.querySelector("checkBoard")
    // console.log(checkBoard)

// this const is for creating movement rules
// i will use this along with some more math to calculate legal moves for the checkers... i.e. divclass#2 += (width + 1) or += (width -1) to check diaganal adjacent squares and see if a child element is present.
const width = 8

let playerTurn = 'white'
// I want to be able to reverse the div ids from 0-63 to 63-0 so that when the player turn changes, the div ids will change and one function can be used to check legal moves  


//these constants below allow me to have access to the divs i created in html in this js//
//I want to be able to access the id of each element within the allSquares array so that I can drag an element to a new div and have it change its location to the new id// 
const p2Pieces = document.querySelectorAll(".p2Piece")
    console.log(p2Pieces)
// this const contains an array of player twos pieces
const p1Pieces = document.querySelectorAll(".p1Piece")
    console.log(p1Pieces)
// this const contains an array of player ones pieces
const allSquares = document.querySelectorAll(".square")
    console.log(allSquares)

//this const contains all the 64 squares of the gameboard and their child elements (player pieces)


allSquares.forEach((square) => { 
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop)
})


let startPieceId
let dragElement

function dragStart (e) {
    startPieceId = e.target.parentNode.getAttribute('square-id')
    dragElement = e.target
}

function dragOver(e) {
    e.preventDefault()
    console.log(e.target)
}

function dragDrop(e) {
    e.stopPropagation()
    e.target.append(dragElement)
    const correctTurn = dragElement.firstChild.classList.contains(playerTurn)
    const taken = e.target.contains('p1Piece' | 'p2Piece')
    const legal = checkIfLegal(e.target)
    const opponentTurn = playerTurn === 'red' ? 'white' : 'red'
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentTurn)

    if (correctTurn) {
        if (takenByOpponent && legal) {
            e.target.parentNode.append(dragElement)
            e.target.remove()
            changePlayer()
            return
        }

        if (taken && !takenByOpponent) {
            return
        }
        if (legal) {
            e.target.append(dragElement)
            changePlayer()
            return
        }
    }
}

function changePlayer() {  
    if (playerTurn === 'white') {
        playerTurn = 'red'
    } else (playerTurn === 'red')
        playerTurn = 'white'
}

function reverseIds() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => 
        square.setAttribute('square-id', (width * width -1) - i))
}

function revertIds() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => square.setAttribute('square-id', i))
}

function checkIfLegal(target) {
    const targetId = Number(target.getAttribute('square-Id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId)
    const piece = dragElement.id
}
//  A move consists of moving a piece diagonally to an adjacent unoccupied square.
//  If the adjacent square contains an opponent's piece, 
//  and the square immediately beyond it is vacant, 
//  the piece may be captured (and removed from the game) by jumping over it.//

//////***********pseudocode***********/////////
//create a function that allows me to iterate board positions and ids into an array
