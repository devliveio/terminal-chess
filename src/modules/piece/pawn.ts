import { Piece } from '.'

import { Board } from '../board'

import { Coordinates, PieceColor } from '../../shared/types'

export class Pawn extends Piece {
  private hasMoveOnce: boolean
  constructor(color: PieceColor) {
    super(color, 1)
    this.hasMoveOnce = false
  }

  canMove(from: Coordinates, to: Coordinates, board: Board): boolean {
    const [fromRow, fromCol] = from
    const [toRow, toCol] = to

    const direction = this.color === 'white' ? 1 : -1

    if (
      fromCol === toCol &&
      toRow === fromRow + direction &&
      !board.getPieceAt(to)
    ) {
      this.hasMoveOnce = true
      return true
    }

    if (
      fromCol === toCol &&
      !this.hasMoveOnce &&
      toRow === fromRow + 2 * direction &&
      !board.getPieceAt(to)
    ) {
      this.hasMoveOnce = true
      return true
    }

    if (
      Math.abs(fromCol - toCol) === 1 &&
      toRow === fromRow + direction &&
      board.getPieceAt(to)?.color !== this.color
    ) {
      this.hasMoveOnce = true
      return true
    }

    return false
  }

  toString(): string {
    return this.color === 'white' ? '♟' : '♙'
  }
}
