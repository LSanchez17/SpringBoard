import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for(let i = 0; i < nrows; i++){
      initialBoard.push([]);
      for(let j = 0; j < ncols; j++){
        let chance = chanceLightStartsOn();
        if(chance >= .50){
          initialBoard[i].push(true);
        }
        if(chance < .50){
          initialBoard[i].push(false);
        }
      }
    }
    console.log(initialBoard)
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    board.every(row => row.every(cell => cell === true));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      console.log('Im flipping')
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y,x, boardCopy);
      flipCell(y, x-1, boardCopy);
      flipCell(y, x+1, boardCopy);
      flipCell(y-1, x, boardCopy);
      flipCell(y+1, x, boardCopy);
      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()){
    return(<div><h1>You Win!</h1></div>);
  }

  // make table board
  let litTable = [];

  for(let y=0; y<nrows; y++){
    //create a row that stores cells
    let row = [];
    for(let x=0; x<ncols; x++){
      //create a coordinate, which is needed to flip cells around it in the flipCellsAround fn
      let coords = `${y}-${x}`;
      //add a Cell component to the row array with props passing down
      //Don't forget to accurately pass dow the props!
      row.push(<Cell key={coords} flipCellsAroundMe={() => flipCellsAround(coords)} isLit={board[y][x]} /> );
    }
    litTable.push(<tr key={y}>{row}</tr>);
  }

  return(
    <table className='Board'>
      <tbody>{litTable}</tbody>
    </table>
  )
}

export default Board;
