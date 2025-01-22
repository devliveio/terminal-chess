import { ChessTile, Piece, Color, PieceType } from "../../types";
import { CHESS_PIECES_REP } from "../../const";

export class King implements Piece {
  type: PieceType = PieceType.KING;
  color: Color;
  rep: string;
  position: [number, number];

  constructor(color: Color, startPosition: [number, number]) {
    this.color = color;
    this.rep =
      color === Color.WHITE
        ? CHESS_PIECES_REP[this.type][0]
        : CHESS_PIECES_REP[this.type][1];
    this.position = startPosition;
  }
  capture(to: [number, number], chessBoard: string[][]): boolean {
    throw new Error("Method not implemented.");
  }

  move(to: [number, number], chessBoard: string[][]): Piece|null{
    return this
  }
}
