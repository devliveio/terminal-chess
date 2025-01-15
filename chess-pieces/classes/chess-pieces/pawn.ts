import { ChessTile, Color, Piece} from "../../types";

export class Pawn implements Piece {
  public id: string;
  public color: Color;
  private hasMoved:boolean = false
  private direction:number 

  constructor(color: Color) {
    this.id = color === Color.BLACK ? "♙" : "♟"
    this.color = color
    this.direction = color === Color.BLACK ? -1 : 1

  }

  pawnMoveCheck(from:ChessTile,to:ChessTile,):boolean {
    const [fromRow,fromCol] = from.index
    const [toRow, toCol] = to.index

    if(toCol !== fromCol) return false
    const distance = toRow - fromRow

    return this.isTwoSpacesRuleAvailable(distance) || this.isRegularMove(distance)

  }


  isTwoSpacesRuleAvailable(distance:number):boolean {
    if(!this.hasMoved && distance === 2*this.direction) {
      return true
    }
    return false
  }


  isRegularMove(distance:number):boolean {
    if(distance === this.direction) {
      return true
    }

    return false
  }


  //TODO:Promotion Logic

  isMoveValid(from:ChessTile,to:ChessTile): boolean {
   
    return this.pawnMoveCheck(from,to)

    //Pawn can move diagonally when capturing an opponent piece
    // if (
    //   difRow === direction &&
    //   Math.abs(difCol) === 1 &&
    //   piece?.color !== this.color
    // ) {
    //     return true;
    // }

    
    // return false;
  }

  //Pawn moves one space ahead
  move(from:ChessTile, to:ChessTile):boolean{

    if (!this.isMoveValid(from,to)) {
      console.log("not a valid position for a pawn", to.index);
      return false;
    }
    if(!this.hasMoved) {
        this.hasMoved = true
    }

    return true;
  }
}
