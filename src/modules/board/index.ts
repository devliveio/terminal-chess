import { BLACK_PIECES_SYMBOLS, PieceColor, PieceType, WHITE_PIECES_SYMBOLS } from "../../shared/types";
import { Piece } from "../pieces";
import { blackPiecesFactory, whitePiecesFactory } from "../pieces-factory";
import { PieceManager } from "../pieces-manager";

export class Board {
  private board: (Piece | null)[][];
  private pieceManager: PieceManager = new PieceManager();
  private _size: number = 8;

  constructor() {
    this.board = this.createEmptyBoard();
  }

  public get size(): number {
    return this._size;
  }

  public getPieceAtPosition(position: number[]): Piece | null {
    return this.board[position[0]][position[1]];
  }

  private createEmptyBoard(): (Piece | null)[][] {
    return Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => null)
    );
  }

  prepareBoard(): void {
    this.addPieces();
  }

  private addPieces(): void {
    this.prepareRows(0, "white");
    this.prepareRows(7, "black");
  }

  private prepareRows(rowIndex: number, color: PieceColor): void {
    const orderedPiecesRow: PieceType[] = [
      PieceType.ROOK,
      PieceType.KNIGHT,
      PieceType.BISHOP,
      PieceType.QUEEN,
      PieceType.KING,
      PieceType.BISHOP,
      PieceType.KNIGHT,
      PieceType.ROOK,
    ];

    orderedPiecesRow.forEach((piece, index) => {
      this.createPiece(piece, [rowIndex, index], color);
      this.createPiece(PieceType.PAWN, [rowIndex + (color === "white" ? 1 : -1), index], color);
    });
  }

  private createPiece(pieceType: PieceType, position: [number, number], color: PieceColor): void {
    const newPiece = color === "white"
      ? whitePiecesFactory.createPiece(pieceType)
      : blackPiecesFactory.createPiece(pieceType);
    this.board[position[0]][position[1]] = newPiece;
    this.pieceManager.setPiecesLocation(newPiece, position);
  }

  updatePiecePositionInBoard(currentPosition: number[], nextPosition: number[]|null, piece: Piece): void {
    this.board[currentPosition[0]][currentPosition[1]] = null;
    if(nextPosition){
      this.board[nextPosition[0]][nextPosition[1]] = piece;
    }
    this.pieceManager.updatePiecePosition(`${piece.color}-${piece.type}`, currentPosition, nextPosition);
  }

  getPiecesLocation(index:string):(number[]|null)[] {
    return this.pieceManager.getPiecesLocation(index)
  }

  print(): void {
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
          })
          .join(" ") + " |";

      console.log(`${row + 1} ${rowString} ${row + 1}`);
      console.log(topBorder);
    }

    console.log("    a     b    c    d    e    f    g    h ");
  }
}