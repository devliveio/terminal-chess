import { ChessTile, Piece, Color } from "../../types";

export class Rook implements Piece {
  public id: string;
  public color: Color;
  private hasMoved:boolean = false

  constructor(color: Color) {
    this.id = color === Color.BLACK ? "♖" : "♜";
    this.color = color;
  }

  //Rock can only move on a row or on a column, not both
  validMove(
    from: ChessTile,
    to: ChessTile,
    chessBoard: ChessTile[][]
  ): boolean {
    const {
      index: [toRow, toCol],
      piece,
    } = to;
    const {
      index: [fromRow, fromCol],
    } = from;

    //Vertical Movement
    if (fromCol === toCol) {
      if (!this.isPathClear(fromRow, toRow, toCol, true, chessBoard)) {
        console.log("Invalid vertical movement")
        return false;
      }
    }
    //Horizontal Movement
    else if (fromRow === toRow) {
      if (!this.isPathClear(fromCol, toCol, toRow, false, chessBoard)) {
        console.log("Invalid horizontal movement")
        return false;
      }
    } else {
      return false;
    }

    if (piece?.color === this.color) {
      console.log("Cannot capture you own piece")
      return false;
    }

    return true;
  }

  move(from: ChessTile, to: ChessTile, chessBoard: ChessTile[][]): boolean {
    const valid = this.validMove(from, to, chessBoard);

    if (!valid) {
      console.log("not a valid position for rook", to.index);
      return false;
    }

    //TODO: ENROQUE
    if(!this.hasMoved) {
      this.hasMoved = true
    }

    //Update location
    return true;
  }

  isPathClear(
    start: number,
    end: number,
    fixed: number,
    isVertical: boolean,
    chessBoard: ChessTile[][]
  ): boolean {
    const direction = end > start ? 1 : -1;
    let step = start + direction;
 
    while (step !== end) {
      if (
        isVertical
          ? chessBoard[step][fixed].piece
          : chessBoard[fixed][step].piece
      ) {
        console.log(`not clear path, piece found in step ${step}`)
        return false;
      }

      step += direction;
    }

    return true;
  }
}
