import { Piece } from "../types";
import { BlackPiecesFactory, WhitePiecesFactory } from "./pieces-factory";

const BOARD_SIZE: number = 8;

const DEFAULT_BOARD: string[][] = [
  ["R", "B", "N", "Q", "K", "N", "B", "R"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["r", "b", "n", "q", "k", "n", "b", "r"],
];

const EMPTY_CELL: string = "   ";

export class BoardCreator {
  private blackPiecesFactory: BlackPiecesFactory = new BlackPiecesFactory();
  private whitePiecesFactory: WhitePiecesFactory = new WhitePiecesFactory();
  public whitePieces: Piece[] = [];
  public blackPieces: Piece[] = [];
  public board: string[][] = this.initBoard();

  constructor() {}

  private createGrid(size: number): string[][] {
    return Array.from({ length: size }, () =>
      Array.from({ length: size }, () => {
        return EMPTY_CELL;
      })
    );
  }

  private initBoard(): string[][] {
    const initChestTile = this.createGrid(BOARD_SIZE);
    this.createPieces(DEFAULT_BOARD);
    return initChestTile;
  }

  private createPieces(schematicBoard: string[][]): boolean {
    for (let i = 0; i < schematicBoard.length; i++) {
      for (let j = 0; j < schematicBoard[0].length; j++) {
        if (DEFAULT_BOARD[i][j] !== " ") {
          if (i < 2) {
            const whitePiece: Piece = this.whitePiecesFactory.createPiece(
              DEFAULT_BOARD[i][j],
              [i, j]
            );
            this.whitePieces.push(whitePiece);
          } else {
            const blackPiece: Piece = this.blackPiecesFactory.createPiece(
              DEFAULT_BOARD[i][j],
              [i, j]
            );
            this.blackPieces.push(blackPiece);
          }
        }
      }
    }
    return true;
  }

  printBoard() {
    const topBorder = "  +----+----+----+----+----+----+----+----+";

    // for (let row = 0; row < this.board.length; row++) {
    //   for (let col = 0; col < this.board[row].length; col++) {
    //     this.board[row][col] = EMPTY_CELL;
    //   }
    // }

    this.whitePieces.forEach((piece) => {
      if (!piece.position) return;
      const [row, col] = piece.position;
      return (this.board[row][col] = ` ${piece.rep} `); // Adjust as needed
    });

    this.blackPieces.forEach((piece) => {
      if (!piece.position) return;
      const [row, col] = piece.position;
      this.board[row][col] = ` ${piece.rep} `; // Adjust as needed
    });

    console.log("    a     b    c    d    e    f    g    h "); // Column letters
    console.log(topBorder);

    for (let row = this.board.length - 1; row >= 0; row--) {
      const rowString =
        this.board[row].map((cell) => `|${cell}`).join(" ") + " |";
      console.log(`${row + 1} ${rowString} ${row + 1}`); // Row numbers
      console.log(topBorder);
    }

    console.log("    a     b    c    d    e    f    g    h "); // Column letters
  }
}
