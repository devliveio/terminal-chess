import { BoardCreator } from ".";
import { Color, Piece, PieceType } from "../types";
import { stringToPieceType } from "../const";

const prompts = require("prompt-sync")();

const BOARD_SIZE = 8;
class ChessGame {
  private boardCreator = new BoardCreator();

  constructor() {}

  main() {
    console.log("Welcome to Terminal Chess");
    this.playChessGame()
   
  }

  playChessGame() {
    let turn: Color = Color.WHITE;

    while (true) {
      this.boardCreator.printBoard();
      console.log(`It is ${turn}´s turn:`);
      const input = prompts("Enter your movement: ");

      const moveValid = this.movePiece(input, turn);

      if (moveValid) {
        turn = turn === Color.WHITE ? Color.BLACK : Color.WHITE;
      }
    }
  }

  movePiece(notation: string, turn: Color): boolean {
    let leftOverNotation: string = notation;

    //TODO: Enroque input
    if (leftOverNotation === "0-0-0") {
      //Only move for the rock king
    } else if (leftOverNotation === "0-0-0-0") {
      //only move for the rock queen
    }

    if (leftOverNotation.length < 1 || leftOverNotation.length > 4) {
      console.log("Invalid Move: Incorrect format");
      return false;
    }

    //Ex: Nd2 => N // d2 => "" // Nxd2 => Nx // exd2 => ex
    const stringDestination = leftOverNotation.slice(-2);
    console.log("string Destination", stringDestination);
    const destination = this.notationToCoordinates(stringDestination);
    console.log("destination", destination);

    const isInBounds = this.isCoordinatesInsideBounds(destination);
    if (!isInBounds) {
      console.log(`Move ${notation} Invalid: out of bounds `);
      return false;
    }

    leftOverNotation = leftOverNotation.slice(0, -2);
    // console.log("notation pending", leftOverNotation)

    //Ex: N => "" // "" => "" //  Bx => x // ex => x => if there is capture, an x will always remain
    const stringPiece = leftOverNotation.slice(0, 1);

    const selectedPiece: PieceType | null = this.getPieceType(stringPiece);

    console.log("selected Piece", selectedPiece);
    leftOverNotation = leftOverNotation.slice(1);
    // console.log("notation pending", leftOverNotation)

    if (!selectedPiece) {
      console.log(`Move ${notation} Invalid: No piece called ${stringPiece}`);
      return false;
    }

    const availablePieces = this.getAvailablePieces(selectedPiece, turn);

    if (availablePieces.length === 0) {
      console.log("Move Invalid: No pieces available to do current move");
    }

    if (leftOverNotation === "x") {
      console.log("Capturing Move");
      return this.captureMove(availablePieces, destination,turn);
    } else {
      console.log("Regular Move");
      return this.regularMove(availablePieces, destination);
    }
  }

  private regularMove(pieces: Piece[], destination: [number, number]): boolean {
    const validPieces = pieces.filter((piece) =>
      piece.move(destination, this.boardCreator.board)
    );
    if (validPieces.length > 1) {
      console.log("Move Invalid, ambiguity");
      //TODO: Logic to break ambiguity
      return false;
    } else if (validPieces.length === 0) {
      console.log("Move Invalid, no pieces available to make that move");
      return false;
    }
    const [row, col] = validPieces[0].position!;
    validPieces[0].position = destination;
    this.boardCreator.board[row][col] = "   ";

    return true;
  }

  private captureMove(
    pieces: Piece[],
    destination: [number, number],
    turn: Color
  ): boolean {
    const validPieces = pieces.filter((piece) =>
      piece.capture(destination, this.boardCreator.board)
    );
    console.log("capture valid", validPieces);
    if (validPieces.length > 1) {
      console.log("Move Invalid, ambiguity");
      //TODO: Logic to break ambiguity
      return false;
    } else if (validPieces.length === 0) {
      console.log("Move Invalid, no pieces available to make that move");
      return false;
    }

    if (turn === Color.WHITE) {
      this.eliminateBlackPiece(destination[0], destination[1]);
      console.log("black remaining", this.boardCreator.blackPieces.length)
    } else {
      this.eliminateWhitePiece(destination[0], destination[1]);
      console.log("white remaining", this.boardCreator.whitePieces.length)
    }

    const [row, col] = validPieces[0].position;
    validPieces[0].position = destination;
    this.boardCreator.board[row][col] = "   ";
    return true;

  }

  private eliminateWhitePiece(row: number, col: number) {
    this.boardCreator.whitePieces = this.boardCreator.whitePieces.filter(
      (piece) =>
        piece.position && piece.position[0] !== row && piece.position[1] !== col
    );
  }

  private eliminateBlackPiece(row: number, col: number) {
    this.boardCreator.blackPieces = this.boardCreator.blackPieces.filter(
      (piece) =>
        piece.position && piece.position[0] !== row && piece.position[1] !== col
    );
  }

  private getPieceType(pieceNotation: string): PieceType | null {
    if (/^[a-h]$/.test(pieceNotation)) {
      return PieceType.PAWN;
    }

    const pieceType: PieceType = stringToPieceType[pieceNotation];

    if (!pieceType) {
      console.log(`Piece ${pieceNotation} not found`);
      return null;
    }

    return pieceType;
  }

  private getAvailablePieces(type: PieceType, turn: Color): Piece[] {
    const result: Piece[] =
      turn === Color.WHITE
        ? this.boardCreator.whitePieces.filter(
            (piece) => piece.type === type && piece.position !== null
          )
        : this.boardCreator.blackPieces.filter(
            (piece) => piece.type === type && piece.position !== null
          );

    return result;
  }

  private isCoordinatesInsideBounds(destination: [number, number]): boolean {
    const [row, col] = destination;

    if (row < 0 || row >= BOARD_SIZE || col < 0 || col > BOARD_SIZE) {
      return false;
    }
    return true;
  }

  private notationToCoordinates(notation: string): [number, number] {
    const file = notation.charCodeAt(0) - "a".charCodeAt(0);
    const rank = parseInt(notation[1]) - 1;
    return [rank, file];
  }

}

const chessGame = new ChessGame();
chessGame.main();
