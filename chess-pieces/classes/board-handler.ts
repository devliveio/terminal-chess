import { ChessTile } from "../types";
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

export class BoardHandler {
  public board: ChessTile[][] 
  private blackPiecesFactory:BlackPiecesFactory 
  private whitePiecesFactory:WhitePiecesFactory
 
  constructor() {
    this.blackPiecesFactory = new BlackPiecesFactory()
    this.whitePiecesFactory = new WhitePiecesFactory()
    this.board = this.initBoard()
  }

  private createGrid(size: number): ChessTile[][] {
    return Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => {
        const emptyChessTile: ChessTile = {
          index: [row, col],
          piece: null,
          print: "___|",
        };
        return emptyChessTile;
      })
    );
  }

  private initBoard(): ChessTile[][] {
    const initChestTile = this.createGrid(BOARD_SIZE);
    this.placePieces(initChestTile);
    return initChestTile;
  }

  private placePieces(initChestTile: ChessTile[][]):boolean {
    for (let i = 0; i < initChestTile.length; i++) {
      for (let j = 0; j < initChestTile[0].length; j++) {
        if (DEFAULT_BOARD[i][j] !== " ") {
          if (i < 2) {
            initChestTile[i][j].piece = this.whitePiecesFactory.createPiece(DEFAULT_BOARD[i][j]);
          } else {
            initChestTile[i][j].piece = this.blackPiecesFactory.createPiece(DEFAULT_BOARD[i][j]);
          }
        }
      }
    }
    return true
  }

  printBoard() {
    const topBorder = "  +----+----+----+----+----+----+----+----+";
    console.log(topBorder);

    for (let i = this.board.length-1; i >= 0; i--) {
      let row = `${i+1} |`; //Row number
      for (let j = 0 ; j  < this.board[0].length; j++) {
        row += ` ${this.board[i][j].piece?.id || " "}  |`;
      }
      console.log(row);
    }
    console.log(topBorder);
    console.log("    a     b    c    d    e    f    g    h "); // Column letters
  }

}
