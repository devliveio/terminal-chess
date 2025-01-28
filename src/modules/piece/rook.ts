import { Piece } from '.'

import { Board } from '../board'

import { PieceColor } from '../../shared/types'

export class Rook extends Piece {
  constructor(color: PieceColor) {
    super(color, 5)
  }

  canMove(from: [number, number], to: [number, number], board: Board): boolean {
    const [fromRow, fromCol] = from
    const [toRow, toCol] = to

    if (
      fromRow === toRow &&
      fromCol !== toCol &&
      (!board.getPieceAt(to) || board.getPieceAt(to)?.color !== this.color)
    ) {
      const step: number = toCol > fromCol ? 1 : -1
      let currentCol = fromCol + step
      while (currentCol !== toCol) {
        if (board.getPieceAt([fromRow, currentCol])) return false
        currentCol += step
      }
      return true
    }

    if (
      fromCol === toCol &&
      fromRow !== toRow &&
      (!board.getPieceAt(to) || board.getPieceAt(to)?.color !== this.color)
    ) {
      const step: number = toRow > fromRow ? 1 : -1
      let currentRow = fromRow + step
      while (currentRow !== toRow) {
        if (board.getPieceAt([currentRow, fromCol])) return false
        currentRow += step
      }
      return true
    }

    return false
  }

  toString(): string {
    return this.color === 'white' ? '♜' : '♖'
  }
}
