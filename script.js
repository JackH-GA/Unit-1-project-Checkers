console.log('script is running')
// these constants will be used for showing whose turn it is, and displaying if an illegal move is trying to be made
const checkBoard = document.getElementsByClassName("checkBoard")
    // console.log(checkBoard)
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")

// this const is for creating movement rules
const width = 8
// i will use this along with some more math to calculate legal moves for the checkers... i.e. divclass#2 += (width + 1) or += (width -1) to check diaganal adjacent squares and see if a child element is present. 


//these constants below allow me to have access to the divs i created in html in this js//
//I want to be able to access the id of each element within the allSquares array so that I can drag an element to a new div and have it change its location to the new id// 
const p2Pieces = document.getElementsByClassName("p2Piece")
    console.log(p2Pieces)
// this const contains an array of player twos pieces
const p1Pieces = document.getElementsByClassName("p1Piece")
console.log(p1Pieces)
// this const contains an array of player ones pieces
const allSquares = document.getElementsByClassName("square")
    console.log(allSquares)
//this const contains all the 64 squares of the gameboard and their child elements (player pieces)

function drag() {
    allSquares.forEach(square => { 
        square.addEventListener('dragpiecestart', dragPieceStart)
    })
}


function dragPieceStart(e) {
    startPieceId = e.target.getAttribute('square-id')
    dragElement = e.target
    console.log(e)
}

 



//  A move consists of moving a piece diagonally to an adjacent unoccupied square.
//  If the adjacent square contains an opponent's piece, 
//  and the square immediately beyond it is vacant, 
//  the piece may be captured (and removed from the game) by jumping over it.//

//////***********pseudocode***********/////////
//create a function that allows me to iterate board positions and ids into an array
