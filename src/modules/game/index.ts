import { Coordinates } from './../../shared/types/coordinates'
import { Board } from '../board'

export class Game {
  board: Board
  currentTurn: 'white' | 'black'
  notation: Notation

  constructor() {
    this.board = new Board()
    this.currentTurn = 'white'
    this.notation = new Notation()
  }

  makeMove(move: string): boolean {
    const parsedMove = this.notation.parseMove(
      move,
      this.board,
      this.currentTurn
    )
    if (!parsedMove) return false

    const { from, to } = parsedMove
    if (this.board.movePiece(from, to)) {
      this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white'
      return true
    }

    return false
  }
}

class Notation {
  parseMove(
    move: string,
    board: Board,
    currentTurn: 'white' | 'black'
  ): { from: Coordinates; to: Coordinates } | null {
    const match = move.match(/^([KQBNR]?)([a-h]?)([1-8]?)(x?)([a-h][1-8])$/)
    if (!match) return null

    const [, pieceSymbol, fileHint, rankHint, capture, destination] = match
    const targetPieceType = this.getPieceType(pieceSymbol)
    const to: Coordinates = board.positionToIndices(destination)

    const toPiece = board.getPieceAt(to)
    if (capture && (!toPiece || toPiece.color === currentTurn)) return null

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const currentCell: Coordinates = [row, col]
        const position = board.indicesToPosition(row, col)
        const piece = board.getPieceAt(currentCell)

        console.log(
          [row, col],
          piece,
          piece?.color === currentTurn,
          piece?.constructor.name === targetPieceType,
          !fileHint || position[0] === fileHint,
          !rankHint || position[1] === rankHint
        )

        if (!piece) continue

        if (piece.color !== currentTurn) continue

        if (piece.constructor.name !== targetPieceType) continue

        if (fileHint && position[0] !== fileHint) continue

        if (rankHint && position[1] !== rankHint) continue

        if (!piece.canMove(currentCell, to, board)) continue

        return { from: currentCell, to }
      }
    }

    return null
  }

  getPieceType(symbol: string): string {
    switch (symbol) {
      case 'K':
        return 'King'
      case 'Q':
        return 'Queen'
      case 'R':
        return 'Rook'
      case 'B':
        return 'Bishop'
      case 'N':
        return 'Knight'
      default:
        return 'Pawn'
    }
  }
}
