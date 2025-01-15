import { ChessTile, Color, Piece} from "../../types";

export class Pawn implements Piece {
  public id: string;
  public color: Color;
  private hasMoved:boolean = false

  constructor(color: Color) {
    this.id = color === Color.BLACK ? "♙" : "♟"
    this.color = color
  }

  //TODO:Promotion Logic

  pawnMoveChecker(from:ChessTile,to:ChessTile): boolean {
    const { index:[toRow,toCol], piece } = to;
    const { index:[fromRow,fromCol]} = from;
    const difRow = toRow - fromRow;
    const difCol = toCol - fromCol;

    const direction = this.color === Color.BLACK ? -1 : 1;

    //Pawn moves forward in the same column
    if (difCol === 0 && !piece) {
    //Pawn only move 1 space ahead except first turn  
      if(difRow === direction) {
        return true
      } else if(difRow === 2*direction && !this.hasMoved) {
        // console.log("special move")
        return true
      } else {
        return false
      }
    }

    //Pawn can move diagonally when capturing an opponent piece
    if (
      difRow === direction &&
      Math.abs(difCol) === 1 &&
      piece?.color !== this.color
    ) {
        return true;
    }

    
    return false;
  }

  //Pawn moves one space ahead
  move(from:ChessTile, to:ChessTile):boolean{

    if (!this.pawnMoveChecker(from,to)) {
      console.log("not a valid position for a pawn", to.index);
      return false;
    }
    if(!this.hasMoved) {
        this.hasMoved = true
    }

    return true;
  }
}
