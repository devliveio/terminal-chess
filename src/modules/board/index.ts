
import { PieceType } from "../../shared/types";
import { Piece } from "../pieces";
import { blackPiecesFactory, whitePiecesFactory } from "../pieces-factory";

export class Board {
  private board: (Piece | null)[][];

  constructor() {
    this.board = this.prepareBoard();
  }

  private prepareBoard(): (Piece | null)[][] {
    const emptyBoard: (Piece | null)[][] = Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () => null)
    );
    return this.addPieces(emptyBoard);
  }

  private addPieces(emptyBoard: (Piece | null)[][]): (Piece | null)[][] {
    const boardWithPieces = emptyBoard;

    const backRow: PieceType[] = [
      PieceType.ROOK,
      PieceType.KNIGHT,
      PieceType.BISHOP,
      PieceType.QUEEN,
      PieceType.KING,
      PieceType.ROOK,
      PieceType.KNIGHT,
      PieceType.BISHOP,
    ];
    backRow.forEach((piece, index) => {
      boardWithPieces[0][index] = whitePiecesFactory.createPiece(piece);
      boardWithPieces[1][index] = whitePiecesFactory.createPiece(
        PieceType.PAWN
      );
      boardWithPieces[6][index] = blackPiecesFactory.createPiece(
        PieceType.PAWN
      );
      boardWithPieces[7][index] = blackPiecesFactory.createPiece(piece);
    });

    return boardWithPieces;
  }

  print() {
    const topBorder = "  +----+----+----+----+----+----+----+----+";

    console.log("    a     b    c    d    e    f    g    h ");

    for (let row = this.board.length - 1; row >= 0; row--) {
      const rowString =
        this.board[row].map((cell) => `|${cell}`).join(" ") + " |";
      console.log(`${row + 1} ${rowString} ${row + 1}`);
      console.log(topBorder);
    }

    console.log("    a     b    c    d    e    f    g    h ");
  }
}

const board = new Board();

console.log(board.print());
