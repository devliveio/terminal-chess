import { Piece } from '.'

import { Board } from '../board'

import { PieceColor } from '../../shared/types'

export class Pawn extends Piece {
  constructor(color: PieceColor) {
    super(color, 1)
  }

  canMove(from: string, to: string, board: Board): boolean {
    const [fromRow, fromCol] = board.positionToIndices(from);
    const [toRow, toCol] = board.positionToIndices(to);

    const direction = this.color === 'white' ? -1 : 1;
    if (fromCol === toCol && toRow === fromRow + direction && !board.getPieceAt(to)) {
      return true;
    }

    if (Math.abs(fromCol - toCol) === 1 && toRow === fromRow + direction && board.getPieceAt(to)?.color !== this.color) {
      return true;
    }

    return false;
  }

  toString(): string {
    return this.color === 'white' ? '♙' : '♟';
  }
}