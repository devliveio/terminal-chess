import { ChessTile, Piece, Color, PieceType } from "../../types";
import { CHESS_PIECES_REP } from "../../const";

export class Queen implements Piece {
  type: PieceType = PieceType.QUEEN;
  rep: string;
  position: [number, number];
  color: Color;

  constructor(color: Color, startPosition: [number, number]) {
    this.rep =
      color === Color.WHITE
        ? CHESS_PIECES_REP[this.type][0]
        : CHESS_PIECES_REP[this.type][1];
    this.color = color;
    this.position = startPosition;
  }

  move(to: [number, number], chessBoard: string[][]): Piece|null {
    return this
  }

  capture(to: [number, number], chessBoard: string[][]): boolean {
    return true
  }
}
