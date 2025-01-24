import * as PromptSync from 'prompt-sync'

import { ChessBoard } from '../board'

import { InvalidMoveError } from '../error'

import { PieceColor } from '../../shared/types'

const prompt = PromptSync()

export class Game {
  private board: ChessBoard

  constructor() {
    this.board = new ChessBoard()
  }

  play() {
    console.log('Welcome to Terminal Chess')

    this.printRules()

    let showInfo: boolean = false

    while (true) {
      showInfo && this.printRules()

      this.board.print()

      const input: string = prompt(`${this.board.getPlayerTurn()}'s move: `)

      console.clear()

      if (input === 'info') {
        showInfo = !showInfo
      } else if (input === 'exit') break

      try {
        this.board.move(input)
      } catch (error) {
        if (error instanceof InvalidMoveError) {
          console.log(`Invalid Move: ${error.message}, please try again`)
        } else {
          console.error('Unexpected error occurred:', error)
          break
        }
      }
    }
  }

  private printRules() {
    console.log(`Information:
      - P: Pawn
      - N: Knight
      - B: Bishop
      - R: Rook
      - Q: Queen
      - K: King
      - Example move a Pawn notation: 'e4' (Pawn moves to e4)
      - Example piece move: 'Nf3' (Knight moves to f3)
      - Example move with capture: 'Nxf3' (Knight captures piece on f3)
      - Example castling: '0-0' (King side castling)
      - 'exit': End the game
      - 'info': show|hide Information
  `)
  }
}
