import { Piece } from '.'

import { Board } from '../board'

import { Coordinates, PieceColor } from '../../shared/types'

export class King extends Piece {
  constructor(color: PieceColor) {
    super(color, 0)
  }

  canMove(from: Coordinates, to: Coordinates, board: Board): boolean {
    const [fromRow, fromCol] = from
    const [toRow, toCol] = to

    const deltaRow = Math.abs(toRow - fromRow)
    const deltaCol = Math.abs(toCol - fromCol)

    if (deltaRow <= 1 && deltaCol <= 1) {
      if (!board.getPieceAt(to) || board.getPieceAt(to)?.color !== this.color) {
        return true
      }
    }

    return false
  }

  toString(): string {
    return this.color === 'white' ? '♔' : '♚'
  }
}
