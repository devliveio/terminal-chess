import { Piece } from '.'

import { Board } from '../board'

import { Coordinates, PieceColor } from '../../shared/types'

export class Queen extends Piece {
  constructor(color: PieceColor) {
    super(color, 9)
  }

  canMove(from: Coordinates, to: Coordinates, board: Board): boolean {
    const [fromRow, fromCol] = from
    const [toRow, toCol] = to

    const deltaRow = Math.abs(toRow - fromRow)
    const deltaCol = Math.abs(toCol - fromCol)

    if (fromRow === toRow || fromCol === toCol) {
      const rowStep: number =
        toRow - fromRow === 0 ? 0 : toRow - fromRow > 0 ? 1 : -1
      const colStep: number =
        toCol - fromCol === 0 ? 0 : toCol - fromCol > 0 ? 1 : -1

      let currentRow = fromRow + rowStep
      let currentCol = fromCol + colStep

      while (currentRow !== toRow || currentCol !== toCol) {
        if (board.getPieceAt([currentRow, currentCol])) {
          return false
        }
        currentRow += rowStep
        currentCol += colStep
      }

      if (!board.getPieceAt(to) || board.getPieceAt(to)?.color !== this.color) {
        return true
      }
    }

    if (deltaRow === deltaCol) {
      const rowStep: number = toRow - fromRow > 0 ? 1 : -1
      const colStep: number = toCol - fromCol > 0 ? 1 : -1

      let currentRow = fromRow + rowStep
      let currentCol = fromCol + colStep

      while (currentRow !== toRow || currentCol !== toCol) {
        if (board.getPieceAt([currentRow, currentCol])) {
          return false
        }
        currentRow += rowStep
        currentCol += colStep
      }

      if (!board.getPieceAt(to) || board.getPieceAt(to)?.color !== this.color) {
        return true
      }
    }
    return false
  }

  toString(): string {
    return this.color === 'white' ? '♛' : '♕'
  }
}
