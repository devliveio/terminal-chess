import { Piece, Pawn, Knight, Bishop, Rook, Queen, King } from '../piece'

const backRow = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]

export class Board {
  board: (Piece | null)[][]

  constructor() {
    this.board = Array.from({ length: 8 }, () => Array(8).fill(null))

    for (let i = 0; i < 8; i++) {
      this.board[1][i] = new Pawn('black')
      this.board[6][i] = new Pawn('white')
    }

    backRow.forEach((PieceClass, i) => {
      this.board[0][i] = new PieceClass('black')
      this.board[7][i] = new PieceClass('white')
    })

  }

  public print(): void {
    const topBorder = '  +----+----+----+----+----+----+----+----+';
    const columnLabels = '    a    b    c    d    e    f    g    h ';
  
    console.log(columnLabels);
    console.log(topBorder);
  
    for (let row = 7; row >= 0; row--) {
      let rowString = `${row + 1} `;
  
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        const pieceSymbol = piece ? piece.toString() : ' ';
        rowString += `| ${pieceSymbol}  `;
      }
  
      rowString += `| ${row + 1}`;
      console.log(rowString);
      console.log(topBorder);
    }
  
    console.log(columnLabels);
  }

  getPieceAt(position: string): Piece | null {
    const [row, col] = this.positionToIndices(position)
    return this.board[row][col]
  }

  movePiece(from: string, to: string, currentTurn: 'white' | 'black'): boolean {
    const piece = this.getPieceAt(from)

    if (!piece || piece.color !== currentTurn) return false;

    if (piece.canMove(from, to, this)) {
      const [fromRow, fromCol] = this.positionToIndices(from)
      const [toRow, toCol] = this.positionToIndices(to)
      this.board[toRow][toCol] = piece
      this.board[fromRow][fromCol] = null

      return true
    }

    return false
  }

  positionToIndices(position: string): [number, number] {
    const col = position.charCodeAt(0) - 'a'.charCodeAt(0)
    const row = 8 - parseInt(position[1])
    return [row, col]
  }

  indicesToPosition(row: number, col: number): string {
    const file = String.fromCharCode('a'.charCodeAt(0) + col)
    const rank = (8 - row).toString()
    return `${file}${rank}`
  }

  findPiecePosition(piece: Piece): string | null {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (this.board[row][col] === piece) {
          return this.indicesToPosition(row, col);
        }
      }
    }

    return null
  }
}