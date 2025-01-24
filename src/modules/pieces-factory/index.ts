import { Bishop, King, Knight, Pawn, Piece, Queen, Rook } from '../pieces'

import { PieceColor, PIECES_VALUES, PieceType } from '../../shared/types'

export class PiecesFactory {
  constructor(private color: PieceColor) {
    this.color = color
  }

  createPiece(type: PieceType): Piece {
    const pieceValue: number = PIECES_VALUES[type]

    const hashPieceCreation: { [key in PieceType]: Piece } = {
      [PieceType.PAWN]: this.createPawn(pieceValue),
      [PieceType.ROOK]: this.createRook(pieceValue),
      [PieceType.BISHOP]: this.createBishop(pieceValue),
      [PieceType.KNIGHT]: this.createKnight(pieceValue),
      [PieceType.QUEEN]: this.createQueen(pieceValue),
      [PieceType.KING]: this.createKing(pieceValue),
    }

    const piece: Piece | undefined = hashPieceCreation[type]

    if (!piece) {
      throw new Error(`Piece ${type} not found in factory`)
    }

    return piece
  }

  private createPawn(value: number): Piece {
    return new Pawn(this.color, value, PieceType.PAWN)
  }

  private createRook(value: number): Piece {
    return new Rook(this.color, value, PieceType.ROOK)
  }

  private createKnight(value: number): Piece {
    return new Knight(this.color, value, PieceType.KNIGHT)
  }

  private createBishop(value: number): Piece {
    return new Bishop(this.color, value, PieceType.BISHOP)
  }

  private createQueen(value: number): Piece {
    return new Queen(this.color, value, PieceType.QUEEN)
  }

  private createKing(value: number): Piece {
    return new King(this.color, value, PieceType.KING)
  }
}
