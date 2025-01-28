import { Coordinates } from '../../shared/types'
import { Piece, Pawn, Knight, Bishop, Rook, Queen, King } from '../piece'

const backRow = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]

export class Board {
  board: (Piece | null)[][]

  constructor() {
    this.board = Array.from({ length: 8 }, () => Array(8).fill(null))

    for (let i = 0; i < 8; i++) {
      this.board[1][i] = new Pawn('white')
      this.board[6][i] = new Pawn('black')
    }

    backRow.forEach((PieceClass, i) => {
      this.board[0][i] = new PieceClass('white')
      this.board[7][i] = new PieceClass('black')
    })
  }

  public print(): void {
    const topBorder = '  +----+----+----+----+----+----+----+----+'
    const columnLabels = '    a    b    c    d    e    f    g    h '

    console.log(columnLabels)
    console.log(topBorder)

    for (let row = 0; row < 8; row++) {
      let rowString = `${8 - row} `

      for (let col = 0; col < 8; col++) {
        const piece = this.board[7 - row][col]
        const pieceSymbol = piece ? piece.toString() : ' '
        rowString += `| ${pieceSymbol}  `
      }

      rowString += `| ${8 - row}`
      console.log(rowString)
      console.log(topBorder)
    }

    console.log(columnLabels)
    console.log('    ---------------END TURN----------------')
  }

  getPieceAt(position: Coordinates): Piece | null {
    const [row, col] = position
    return this.board[row][col]
  }

  movePiece(from: Coordinates, to: Coordinates): boolean {
    const [fromRow, fromCol] = from
    const [toRow, toCol] = to

    const piece = this.getPieceAt([fromRow, fromCol])

    this.board[toRow][toCol] = piece
    this.board[fromRow][fromCol] = null

    return true
  }

  positionToIndices(position: string): [number, number] {
    const col = position.charCodeAt(0) - 'a'.charCodeAt(0)
    const row = parseInt(position[1]) - 1
    return [row, col]
  }

  indicesToPosition(row: number, col: number): string {
    const file = String.fromCharCode('a'.charCodeAt(0) + col)
    const rank = (row + 1).toString()
    return `${file}${rank}`
  }

  findPiecePosition(piece: Piece): string | null {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (this.board[row][col] === piece) {
          return this.indicesToPosition(row, col)
        }
      }
    }

    return null
  }
}
