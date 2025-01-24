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
    const parsedMove = this.notation.parseMove(move, this.board, this.currentTurn)
    if (!parsedMove) return false

    const { from, to } = parsedMove
    if (this.board.movePiece(from, to, this.currentTurn)) {
      this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white'
      return true
    }

    return false
  }
}

class Notation {
  parseMove(move: string, board: Board, currentTurn: 'white' | 'black'): { from: string; to: string } | null {
    const match = move.match(/^([KQBNR]?)([a-h]?)([1-8]?)(x?)([a-h][1-8])$/)
    if (!match) return null

    const [, pieceSymbol, fileHint, rankHint, capture, to] = match
    const targetPieceType = this.getPieceType(pieceSymbol)

    const toPiece = board.getPieceAt(to)
    if (capture && (!toPiece || toPiece.color === currentTurn)) return null

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const position = board.indicesToPosition(row, col)
        const piece = board.getPieceAt(position)

        if (
          piece &&
          piece.color === currentTurn &&
          piece.constructor.name === targetPieceType &&
          (!fileHint || position[0] === fileHint) &&
          (!rankHint || position[1] === rankHint) &&
          piece.canMove(position, to, board)
        ) {
          return { from: position, to }
        }
      }
    }

    return null
  }

  getPieceType(symbol: string): string {
    switch (symbol) {
      case 'K': return 'King'
      case 'Q': return 'Queen'
      case 'R': return 'Rook'
      case 'B': return 'Bishop'
      case 'N': return 'Knight'
      default: return 'Pawn'
    }
  }
}