import { ChessTile, Piece, Color, PieceType } from "../../types";

import { CHESS_PIECES_REP } from "../../const";

export class Bishop implements Piece {
  type: PieceType = PieceType.BISHOP;
  color: Color;
  rep: string;
  position: [number, number];

  constructor(color: Color, startPosition: [number, number]) {
    this.rep =
      color === Color.WHITE
        ? CHESS_PIECES_REP[this.type][0]
        : CHESS_PIECES_REP[this.type][1];
    this.color = color;
    this.position = startPosition;
  }
  capture(to: [number, number], chessBoard: string[][]): boolean {
    throw new Error("Method not implemented.");
  }

  isValid(from: ChessTile, to: ChessTile): boolean {
    const {
      index: [toRow, toCol],
      piece,
    } = to;
    const {
      index: [fromRow, fromCol],
    } = from;
    const difRow = toRow - fromRow;
    const difCol = toCol - fromCol;

    //Bishop moves diagonally from where they are (difRow === difCol)
    if (Math.abs(difRow) !== Math.abs(difCol)) {
      console.log("Invalid move for the bishop", to);
      return false;
    }

    //Check obstacles along the way
    const stepRow = difRow > 0 ? 1 : -1;
    const stepCol = difCol > 0 ? 1 : -1;

    let currentRow = fromRow + stepRow;
    let currentCol = fromCol + stepCol;

    while (currentCol !== toRow && currentCol !== toCol) {}

    if (to.piece?.color !== this.color) {
      console.log("Bishop capture piece", to.piece);
      return true;
    }

    return false;
  }

  move(to: [number, number], chessBoard: string[][]): Piece | null{
    return this
  }
}
