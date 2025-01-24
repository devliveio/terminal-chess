import { Board, Coordinates, PieceColor, PieceType } from "../../shared/types"

export abstract class Piece {
  constructor(
    public color: PieceColor,
    public value: number,
    public type: PieceType
  ) {
    this.color = color
    this.value = value
    this.type = type
  }

  public abstract canDoMove(
    startCoordinates: Coordinates,
    endCoordinates: Coordinates,
    hasTakeSymbol: boolean,
    board: Board
  ): boolean
}
