import { Piece } from '.'

import { Board } from '../board'

import { PieceColor } from '../../shared/types'
const L_FIRST_STEP: number = 2
const L_SECOND_STEP: number = 1
export class Knight extends Piece {
  constructor(color: PieceColor) {
    super(color, 3)
  }

  canMove(from: [number, number], to: [number, number], board: Board): boolean {
    const [fromRow, fromCol] = from
    const [toRow, toCol] = to

    const deltaRow = Math.abs(fromRow - toRow)
    const deltaCol = Math.abs(fromCol - toCol)

    if (
      (deltaRow === L_FIRST_STEP && deltaCol === L_SECOND_STEP) ||
      (deltaCol === L_FIRST_STEP &&
        deltaRow === L_SECOND_STEP &&
        (!board.getPieceAt(to) || board.getPieceAt(to)?.color !== this.color))
    ) {
      return true
    }

    return false
  }

  toString(): string {
    return this.color === 'white' ? '♞' : '♘'
  }
}
