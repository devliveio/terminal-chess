import { BoardCreator } from ".";
import { CastlingType, Color, Piece, PieceType, PlayerMove } from "../types";
import { stringToPieceType } from "../const";

const prompts = require("prompt-sync")();

const BOARD_SIZE = 8;
class ChessGame {
  private boardCreator = new BoardCreator();

  constructor() {}

  main() {
    console.log("Welcome to Terminal Chess");
    this.playChessGame();
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
    if (notation === "0-0") {
      return this.castlingMove("QUEENSIDE", turn);
    } else if (notation === "0-0-0") {
      return this.castlingMove("KINGSIDE", turn);
    }

    const playerMove: PlayerMove | null = this.parseNotation(notation);

    if (!playerMove) {
      console.log("Invalid notation format: ", notation);
      return false;
    }

    const {
      piece,
      ambiguityBreaker,
      isCapture,
      destination: sDestination,
    } = playerMove;

    console.log("move", playerMove);
    const destination = this.notationToCoordinates(sDestination);
    console.log("destination", destination);
    const isInBounds = this.isCoordinatesInsideBounds(destination);
    if (!isInBounds) {
      console.log(`Move ${notation} Invalid: out of bounds `);
      return false;
    }

    const availablePieces: Piece[] = this.getAvailablePieces(piece, turn);

    if (availablePieces.length === 0) {
      console.log(`Move Invalid: no pieces available with move: ${notation}`);
    }

    if (isCapture) {
      return this.captureMove(
        availablePieces,
        destination,
        turn,
        ambiguityBreaker
      );
    }

    return this.regularMove(availablePieces, destination, ambiguityBreaker);

  }

  castlingMove(type: CastlingType, turn: Color): boolean {
    throw new Error("Method not implemented yet.");
  }

  private regularMove(
    pieces: Piece[],
    destination: [number, number],
    ambiguityBreaker: string | null
  ): boolean {
    let validPieces = pieces.filter((piece) =>
      piece.move(destination, this.boardCreator.board)
    );

    if (validPieces.length === 0) {
      console.log("Move Invalid: Invalid Move");
      return false;
    }

    if (validPieces.length > 1) {
      if (ambiguityBreaker) {
        validPieces = this.breakAmbiguity(validPieces, ambiguityBreaker);
      } else {
        console.log("Ambiguity Error: No ambiguity break detected");
        return false;
      }
    }

    if (validPieces.length !== 1) {
      console.log("Move Invalid: Error during piece selection");
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
    turn: Color,
    ambiguityBreaker: string | null
  ): boolean {
    let validPieces = pieces.filter((piece) =>
      piece.capture(destination, this.boardCreator.board)
    );

    if (validPieces.length === 0) {
      console.log("Capture Invalid: no available piece to make that move");
      return false;
    }

    if (validPieces.length > 1) {
      if (ambiguityBreaker) {
        validPieces = this.breakAmbiguity(validPieces, ambiguityBreaker);
      } else {
        console.log("Ambiguity Error: No ambiguity break detected");
        return false;
      }
    }

    if (validPieces.length !== 1) {
      console.log("Move Invalid: Error during piece selection");
      return false;
    }

    this.eliminatePiece(destination[0], destination[1], turn);

    const [row, col] = validPieces[0].position;
    validPieces[0].position = destination;
    this.boardCreator.board[row][col] = "   ";
    return true;
  }

  private breakAmbiguity(
    validPieces: Piece[],
    ambiguityBreaker: string
  ): Piece[] {
    // console.log(`Handling ambiguity of pieces ${validPieces[0].type}`)
    const file = ambiguityBreaker.charCodeAt(0) - "a".charCodeAt(0);
    const filterPieces: Piece[] = validPieces.filter(
      (piece) => piece.position[1] === file
    );

    if (filterPieces.length !== 1) {
      console.log(
        `Ambiguity not broken between ${filterPieces[0].type}s`
      );
      return filterPieces;
    }

    return filterPieces;
  }

  private eliminatePiece(row: number, col: number, turn: Color) {
    const pieces = turn === Color.BLACK ? "whitePieces" : "blackPieces";

    this.boardCreator[pieces] = this.boardCreator[pieces].filter(
      (piece) =>
        piece.position &&
        !(piece.position[0] === row && piece.position[1] === col)
    );

    console.log(`${pieces} remaining: ${this.boardCreator[pieces].length}`)

    this.boardCreator.board[row][col] = "   ";
  }

  private getAvailablePieces(type: PieceType, turn: Color): Piece[] {
    const result: Piece[] =
      turn === Color.WHITE
        ? this.boardCreator.whitePieces.filter((piece) => piece.type === type)
        : this.boardCreator.blackPieces.filter((piece) => piece.type === type);

    return result;
  }

  private parseNotation(notation: string): PlayerMove | null {
    const notationRegex = /^([KQRBN]?)([a-h]?[1-8]?)(x?)([a-h][1-8])$/;

    const match = notation.match(notationRegex);

    if (!match) {
      return null;
    }
    const [_, piece, ambiguity, capture, destination] = match;

    const pieceType: PieceType = stringToPieceType[piece || "P"];

    return {
      piece: pieceType,
      ambiguityBreaker: ambiguity || null,
      isCapture: capture === "x",
      destination,
    };
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
