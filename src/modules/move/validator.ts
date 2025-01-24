import { Board } from "../board";

export class MoveValidator {
  static isMoveInBounds(
    tileCoordinates: [number, number],
    size: number
  ): boolean {
    const [row, col] = tileCoordinates;

    if (row < 0 || row >= size || col < 0 || col > size) {
      return false;
    }
    return true;
  }

  static isMovingOverCol(startCol:number, finalCol:number):boolean {
    return startCol === finalCol
  }

  static isMovingOverRow(startRow:number, finalRow:number):boolean {
    return startRow === finalRow
  }

  static isMovingNSteps(
    start: number,
    end: number,
    steps: number
  ): boolean {
    return end - start === steps;
  }

  static isMovingNStepsDiagonally(
    startRow: number,
    finalRow: number,
    startCol: number,
    finalCol: number,
    steps: number
  ):boolean {
    if(!this.isMovingDiagonally(startRow,finalRow,startCol,finalCol)) {
      return false
    } 

    return Math.abs(finalRow-startRow) === steps
  }

  static isMovingDiagonally(
    startRow: number,
    finalRow: number,
    startCol: number,
    finalCol: number
  ): boolean {
    return Math.abs(finalRow - startRow) === Math.abs(finalCol - startCol);
  }

  static isColPathFree(
    startRow: number,
    finalRow: number,
    col: number,
    board: Board
  ): boolean {
    const step = startRow < finalRow ? 1 : -1;
    for (let i = startRow + step; i !== finalRow; i += step) {
      if (board.getPieceAtPosition([i, col])) {
        return false;
      }
    }
    return true;
  }
  
  static isRowPathFree(
    startCol: number,
    finalCol: number,
    row: number,
    board: Board
  ): boolean {
    const step = startCol < finalCol ? 1 : -1;
    for (let i = startCol + step; i !== finalCol; i += step) {
      if (board.getPieceAtPosition([row, i])) {
        return false;
      }
    }
    return true;
  }

  static isDiagonalPathFree(
    startRow: number,
    startCol: number,
    finalRow: number,
    finalCol: number,
    board: Board
  ): boolean {
    const rowStep = startRow < finalRow ? 1 : -1;
    const colStep = startCol < finalCol ? 1 : -1;

    let currentRow = startRow + rowStep;
    let currentCol = startCol + colStep;

    while (currentRow !== finalRow && currentCol !== finalCol) {
      if (board.getPieceAtPosition([currentRow, currentCol])) {
        return false; 
      }
      currentRow += rowStep;
      currentCol += colStep;
    }
  
    return true;
  }
}
