import { Piece } from "../pieces";

import { InvalidMoveError } from "../error";

import {
  Board,
  Coordinates,
  NotationComponents,
  ValidPiece,
} from "../../shared/types";

export class MoveHandler {
  processMove(
    pieces: Piece[],
    pieceRegistry: Coordinates[],
    endCoordinates: Coordinates,
    notationComponents: NotationComponents,
    board: Board
  ): ValidPiece {
    const { ambiguityBreaker, takeSymbolPresent } = notationComponents;

    let validPieces: ValidPiece[] = [];

    pieces.forEach((piece, index) => {
      const currentCoordinate = pieceRegistry[index];
      if (
        piece.canDoMove(
          currentCoordinate,
          endCoordinates,
          takeSymbolPresent,
          board
        )
      ) {
        validPieces.push({ piece: piece, coordinates: currentCoordinate });
      }
    });

    if (validPieces.length > 1 && !ambiguityBreaker) {
      throw new InvalidMoveError(
        "More than one piece can do the move, require ambiguity breaker"
      );
    }

    if (validPieces.length > 1 && ambiguityBreaker) {
      const file = ambiguityBreaker.charCodeAt(0) - "a".charCodeAt(0);
      validPieces = validPieces.filter(
        ({ coordinates: [row, col] }) => col === file
      );
    }

    if (validPieces.length !== 1) {
      throw new InvalidMoveError("Ambiguity breaker not sufficient");
    }

    return validPieces[0];
  }
}
