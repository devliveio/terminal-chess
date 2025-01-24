import { Piece } from '.'

import { Board, Coordinates, PieceColor, PieceType } from '../../shared/types'

export class Knight extends Piece {
  public canDoMove(
    startCoordinates: Coordinates,
    endCoordinates: Coordinates,
    hasTakeSymbol: boolean,
    board: Board
  ): boolean {
    throw new Error('Method not implemented.')
  }

  constructor(color: PieceColor, value: number, type: PieceType) {
    super(color, value, type)
  }
}
