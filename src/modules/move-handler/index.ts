import { Castling, NotationComponents, PieceColor } from "../../shared/types";
import { Board } from "../board";
import { InvalidMoveError } from "../error";
import { MoveValidator } from "../move-validator";
import { NotationParser } from "../notation-parser";

export class MoveHandler {
  processMove(notation: string, turn: PieceColor, board: Board): void {
    if (notation === "0-0" || notation === "0-0-0") {
      const castlingType: Castling =
        notation === "0-0" ? "kingSide" : "queenSide";
      return this.castlingMove(castlingType, turn);
    }

    const notationComponents: NotationComponents | null =
      NotationParser.getNotationComponents(notation);
    if (!notationComponents) {
      throw new InvalidMoveError(`Incorrect notation format: ${notation}`);
    }

    const { piece, destination } = notationComponents;

    const endMoveTile = NotationParser.getPositionFromNotation(destination);
    if (!MoveValidator.isMoveInBounds(endMoveTile, board.size)) {
      throw new InvalidMoveError("Move is out of bound");
    }

    const index = `${turn}-${piece}`;

    let piecesPosition: number[][] = board
    .getPiecesLocation(index)
    .filter((position): position is number[] => position !== null);
  
    if (piecesPosition.length === 0) {
      throw new InvalidMoveError("Move Invalid: No pieces available");
    }

    return this.tryToMovePieces(
      piecesPosition,
      endMoveTile,
      notationComponents,
      board
    );
  }

  public castlingMove(type: Castling, turn: PieceColor): void {
    throw new Error("Method not implemented yet.");
  }

  private tryToMovePieces(
    piecesPosition: number[][],
    endPosition: number[],
    notationComponents: NotationComponents,
    board: Board
  ): void {
    const { piece, ambiguityBreaker, takeSymbolPresent } = notationComponents;

    let validStartPositions: number[][] = this.getValidStartPosition(
      piecesPosition,
      endPosition,
      takeSymbolPresent,
      board
    );

    if (validStartPositions.length === 0) {
      throw new InvalidMoveError("No pieces available to execute move");
    }

    if (validStartPositions.length > 1) {
      if (ambiguityBreaker) {
        validStartPositions = this.resolveAmbiguity(
          validStartPositions,
          ambiguityBreaker
        );
      } else {
        throw new InvalidMoveError(
          `More than one piece can that move: No ambiguity breaker in notation: ${notationComponents}`
        );
      }
    }

    if (validStartPositions.length !== 1) {
      throw new InvalidMoveError(
        "`More than one piece can that move: ambiguity breaker not sufficient to get one piece"
      );
    }

    return this.executeMove(validStartPositions[0], endPosition, board);
  }

  private getValidStartPosition(
    piecesPosition: number[][],
    endPosition: number[],
    hasTakeSymbol: boolean,
    board: Board
  ): number[][] {
    return piecesPosition.filter((startPosition) =>
      board
        .getPieceAtPosition(startPosition)
        ?.isMoveValid(board, endPosition, startPosition, hasTakeSymbol)
    );
  }

  private resolveAmbiguity(
    piecesPosition: number[][],
    ambiguityBreaker: string
  ): number[][] {
    const file = ambiguityBreaker.charCodeAt(0) - "a".charCodeAt(0);
    const filterPieces: number[][] = piecesPosition.filter(
      (piece) => piece && piece[1] === file
    );
    return filterPieces;
  }

  private executeMove(
    startPosition: number[],
    endPosition: number[],
    board: Board
  ): void {
    const selectedPiece = board.getPieceAtPosition(startPosition);
    if (!selectedPiece) {
      throw new InvalidMoveError("No piece found");
    }
    selectedPiece?.move(board, startPosition, endPosition);
  }
}
