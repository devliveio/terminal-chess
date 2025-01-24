import { Piece } from '.'

import { Board } from '../board'

import { PieceColor } from '../../shared/types'

export class Knight extends Piece {
  constructor(color: PieceColor) {
    super(color, 3)
  }

  canMove(from: string, to: string, board: Board): boolean {
    return false
  }

  toString(): string {
    return this.color === 'white' ? '♘' : '♞';
  }
}