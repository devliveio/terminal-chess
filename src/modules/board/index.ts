import {
  BLACK_PIECES_SYMBOLS,
  PieceColor,
  PieceType,
  WHITE_PIECES_SYMBOLS,
} from "../../shared/types";
import { Piece } from "../pieces";
import { blackPiecesFactory, whitePiecesFactory } from "../pieces-factory";

export class Board {
  private board: (Piece | null)[][];
  public piecesPosition: { [key in string]: (number[] | null)[] } = {};
  private _size: number = 8;

  constructor() {
    this.board = this.createEmptyBoard();
  }

  public get size(): number {
    return this._size;
  }

  getPieceAtPosition(position: [number, number]): Piece | null {
    return this.board[position[0]][position[1]];
  }

  private createEmptyBoard(): (Piece | null)[][] {
    const emptyBoard: (Piece | null)[][] = Array.from(
      { length: this.size },
      () => Array.from({ length: this.size }, () => null)
    );
    return emptyBoard;
  }

  init(): void {
    this.board = this.addPieces(this.board);
  }

  private addPieces(emptyBoard: (Piece | null)[][]): (Piece | null)[][] {
    const boardWithPieces = emptyBoard;
    this.prepareRows(0, "white");
    this.prepareRows(7, "black");
    return boardWithPieces;
  }

  private prepareRows(rowIndex: number, color: PieceColor) {
    const pieces: PieceType[] = Object.values(PieceType)
    pieces.forEach((piece, index) => {
      this.createPiece(piece, [rowIndex, index], color);
      this.createPiece(
        PieceType.PAWN,
        [rowIndex + (color === "white" ? 1 : -1), index],
        color
      );
    });
  }

  private createPiece(
    pieceType: PieceType,
    position: [number, number],
    color: PieceColor
  ) {
    const newPiece =
      color === "white"
        ? whitePiecesFactory.createPiece(pieceType)
        : blackPiecesFactory.createPiece(pieceType);
    this.board[position[0]][position[1]] = newPiece;
    this.setPiecesLocation(pieceType, position, color);
  }

  private setPiecesLocation(
    pieceType: PieceType,
    position: [number, number],
    color: PieceColor
  ) {
    const index: string = `${color}-${pieceType}`;
    if (this.piecesPosition[index]) {
      this.piecesPosition[index].push(position);
    } else {
      this.piecesPosition[index] = [position];
    }
  }

  getPiecesLocation(index: string): (number[] | null)[] {
    return this.piecesPosition[index];
  }

  print() {
    const topBorder = "  +----+----+----+----+----+----+----+----+";

    console.log("    a     b    c    d    e    f    g    h ");
    console.log(topBorder);

    for (let row = this.board.length - 1; row >= 0; row--) {
      const rowString =
        this.board[row]
          .map((piece) => {
            let cellSymbol: string = " ";
            if (piece) {
              cellSymbol =
                piece.color === "white"
                  ? WHITE_PIECES_SYMBOLS[piece.type]
                  : BLACK_PIECES_SYMBOLS[piece.type];
            }

            return `| ${cellSymbol} `;
          }).join(" ") + " |";

      console.log(`${row + 1} ${rowString} ${row + 1}`);
      console.log(topBorder);
    }

    console.log("    a     b    c    d    e    f    g    h ");
  }
}
