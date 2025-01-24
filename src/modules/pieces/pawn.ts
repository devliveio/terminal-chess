import { Piece } from '.'

import { MoveValidator } from '../move/validator'

import { Board, Coordinates, PieceColor, PieceType } from '../../shared/types'

export class Pawn extends Piece {
  private hasMoveOnce: boolean = false
  private direction: number

  private readonly ADVANCE_STEPS: number = 2
  private readonly NORMAL_STEPS: number = 1
  private readonly CAPTURE_STEPS_COL: number = 1

  constructor(color: PieceColor, value: number, type: PieceType) {
    super(color, value, type)
    this.direction = color === 'white' ? 1 : -1
  }

  private isValidMoveForward(
    startRow: number,
    finalRow: number,
    finalCol: number,
    board: Board
  ): boolean {
    if (!MoveValidator.isColPathFree(startRow, finalRow, finalCol, board)) {
      return false
    }

    if (this.isTwoSpacesRuleAvailable(startRow, finalRow)) {
      return true
    }

    if (
      MoveValidator.isMovingNSteps(
        startRow,
        finalRow,
        this.NORMAL_STEPS * this.direction
      )
    ) {
      return true
    }

    return false
  }

  private isValidCapture(
    finalRow: number,
    finalCol: number,
    board: Board,
    hasTakeSymbol: boolean
  ) {
    if (hasTakeSymbol && board[finalRow][finalCol]?.color !== this.color) {
      return true
    }
    return false
  }

  private isTwoSpacesRuleAvailable(
    startRow: number,
    finalRow: number
  ): boolean {
    return (
      !this.hasMoveOnce &&
      MoveValidator.isMovingNSteps(
        startRow,
        finalRow,
        this.ADVANCE_STEPS * this.direction
      )
    )
  }

  canDoMove(
    startCoordinates: Coordinates,
    endCoordinates: Coordinates,
    hasTakeSymbol: boolean,
    board: Board
  ): boolean {
    const [finalRow, finalCol] = endCoordinates
    const [startRow, startCol] = startCoordinates

    if (MoveValidator.isMovingOverCol(startCol, finalCol)) {
      return this.isValidMoveForward(startRow, finalRow, finalCol, board)
    }

    if (
      MoveValidator.isMovingNStepsDiagonally(
        startRow,
        finalRow,
        startCol,
        finalCol,
        this.CAPTURE_STEPS_COL
      )
    ) {
      return this.isValidCapture(finalRow, finalCol, board, hasTakeSymbol)
    }

    return false
  }
}
