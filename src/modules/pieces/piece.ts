import { PieceColor, PieceType } from "../../shared/types";

import { Board } from "../board";

export abstract class Piece {
  constructor(
    public color: PieceColor,
    public value: number,
    public type: PieceType
  ) {
    this.color = color;
    this.value = value;
    this.type = type;
  }

  public abstract isMoveValid(
    board: Board,
    destination: number[],
    startPosition: number[],
    hasTakeSymbol: boolean
  ): boolean;

  public abstract move(
    board: Board,
    startPosition: number[],
    endPosition: number[]
  ): void 

  protected isOpponentPiece(row: number, col: number, board: Board): boolean {
    const piece = board.getPieceAtPosition([row, col]);
    return piece?.color !== this.color
  }

}
