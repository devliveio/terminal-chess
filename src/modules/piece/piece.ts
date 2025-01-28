import { Board } from '../board'

import { PieceColor } from '../../shared/types'

export abstract class Piece {
  public color: PieceColor
  public value: number

  constructor(color: PieceColor, value: number) {
    this.color = color
    this.value = value
  }

  abstract canMove(
    from: [number, number],
    to: [number, number],
    board: Board
  ): boolean

  abstract toString(): string
}
