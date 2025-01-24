import { Piece } from '../pieces'

import { InvalidMoveError } from '../error'

import { PiecesFactory } from '../pieces-factory'

import { MoveValidator } from '../move/validator'

import { MoveHandler } from '../move/handler'

import {
  BLACK_PIECES_SYMBOLS,
  Coordinates,
  NotationComponents,
  PieceColor,
  PiecesCoordinates,
  PieceType,
  ValidPiece,
  WHITE_PIECES_SYMBOLS,
  Board,
} from '../../shared/types'

const FIRST_BOARD_ROW = 0
const LAST_BOARD_ROW = 7

const backRowPieces: PieceType[] = [
  PieceType.ROOK,
  PieceType.KNIGHT,
  PieceType.BISHOP,
  PieceType.QUEEN,
  PieceType.KING,
  PieceType.BISHOP,
  PieceType.KNIGHT,
  PieceType.ROOK,
]

export class ChessBoard {
  private board: Board
  private playerTurn: PieceColor

  private pieceRegistry: PiecesCoordinates
  private whitePiecesFactory: PiecesFactory
  private blackPiecesFactory: PiecesFactory
  private moveHandler: MoveHandler

  constructor() {
    this.playerTurn = 'white'

    const size = { length: LAST_BOARD_ROW + 1 }

    this.board = Array.from(size, () => Array.from(size, () => null))

    this.whitePiecesFactory = new PiecesFactory('white')

    this.blackPiecesFactory = new PiecesFactory('black')

    this.pieceRegistry = {}

    this.moveHandler = new MoveHandler()

    this.addPieces()
  }

  public getPlayerTurn() {
    return this.playerTurn
  }

  print(): void {
    const topBorder = '  +----+----+----+----+----+----+----+----+'
    console.log('    a     b    c    d    e    f    g    h ')
    console.log(topBorder)

    for (let row = this.board.length - 1; row >= 0; row--) {
      const rowString =
        this.board[row]
          .map((piece) => {
            let cellSymbol: string = ' '
            if (piece) {
              cellSymbol =
                piece.color === 'white'
                  ? WHITE_PIECES_SYMBOLS[piece.type]
                  : BLACK_PIECES_SYMBOLS[piece.type]
            }

            return `| ${cellSymbol} `
          })
          .join(' ') + ' |'

      console.log(`${row + 1} ${rowString} ${row + 1}`)
      console.log(topBorder)
    }

    console.log('    a     b    c    d    e    f    g    h ')
  }

  move2(notation: string) {
    
  }

  move(notation: string): void {
    const notationComponents: NotationComponents | null =
      this.getNotationComponents(notation)

    if (!notationComponents) {
      throw new InvalidMoveError('Incorrect Format')
    }

    const { piece, destination } = notationComponents

    const destinationCoordinates =
      this.getPositionFromNotationComponent(destination)

    const isMoveInBounds = MoveValidator.isCoordinateInBounds(
      destinationCoordinates,
      this.board.length
    )

    if (!isMoveInBounds) {
      throw new InvalidMoveError('Move is out of bounds')
    }

    const index = `${this.playerTurn}-${piece}`

    const pieces = this.getPiecesAtCoordinates(this.pieceRegistry[index])

    if (pieces.length === 0) {
      throw new InvalidMoveError('Don´t have selected piece')
    }

    const pieceToMove = this.moveHandler.processMove(
      pieces,
      this.pieceRegistry[index],
      destinationCoordinates,
      notationComponents,
      this.board
    )

    this.updatePiecePosition(pieceToMove, destinationCoordinates)
    this.nextTurn()
  }

  private nextTurn() {
    this.playerTurn = this.playerTurn === 'white' ? 'black' : 'white'
  }

  private getPositionFromNotationComponent(notation: string): Coordinates {
    const file = notation.charCodeAt(0) - 'a'.charCodeAt(0)
    const rank = parseInt(notation[1]) - 1
    return [rank, file]
  }

  private getPiecesAtCoordinates(positions: Coordinates[]): Piece[] {
    return positions.map(([row, col]) => this.board[row][col]!)
  }

  private addPieces(): void {
    this.addPiecesToRow(FIRST_BOARD_ROW, 'white')
    this.addPiecesToRow(LAST_BOARD_ROW, 'black')
  }

  private addPiecesToRow(rowIndex: number, color: PieceColor): void {
    backRowPieces.forEach((piece, colIndex) => {
      this.createPiece(piece, [rowIndex, colIndex], color)
      this.createPiece(
        PieceType.PAWN,
        [rowIndex + (color === 'white' ? 1 : -1), colIndex],
        color
      )
    })
  }

  private createPiece(
    pieceType: PieceType,
    [row, col]: Coordinates,
    color: PieceColor
  ): void {
    const newPiece =
      color === 'white'
        ? this.whitePiecesFactory.createPiece(pieceType)
        : this.blackPiecesFactory.createPiece(pieceType)
    this.board[row][col] = newPiece
    this.addPieceToRegistry(newPiece, [row, col])
  }

  private addPieceToRegistry(piece: Piece, coordinates: Coordinates) {
    const index = `${piece.color}-${piece.type}`
    if (this.pieceRegistry[index]) {
      this.pieceRegistry[index].push(coordinates)
    } else {
      this.pieceRegistry[index] = [coordinates]
    }
  }

  private updatePieceCoordinateInRegistry(
    piece: Piece,
    oldCoordinates: Coordinates,
    newCoordinates: Coordinates
  ) {
    const index = `${piece.color}-${piece.type}`
    if (!this.pieceRegistry[index]) {
      throw new Error('Piece not found in registry')
    } else {
      this.pieceRegistry[index] = this.pieceRegistry[index].map((registry) => {
        const [oldRow, oldCol] = oldCoordinates
        const [registerRow, registerCol] = registry
        if (oldRow === registerRow && oldCol === registerCol) {
          return newCoordinates
        } else {
          return registry
        }
      })
    }
  }

  private deletePieceInRegistry(piece: Piece, coordinates: Coordinates) {
    const index = `${piece.color}-${piece.type}`
    if (!this.pieceRegistry[index]) {
      throw new Error('Piece not found in registry')
    } else {
      this.pieceRegistry[index] = this.pieceRegistry[index].filter(
        (registry) => registry !== coordinates
      )
    }
  }

  private updatePiecePosition(
    validPiece: ValidPiece,
    nextPosition: Coordinates
  ): void {
    const {
      piece,
      coordinates: [oldRow, oldCol],
    } = validPiece
    const [nextRow, nextCol] = nextPosition

    this.board[oldRow][oldCol] = null
    const capturePiece: Piece | null = this.board[nextRow][nextCol]

    if (capturePiece) {
      this.deletePieceInRegistry(capturePiece, nextPosition)
    }

    this.board[nextRow][nextCol] = piece
    this.updatePieceCoordinateInRegistry(
      piece,
      [oldRow, oldCol],
      [nextRow, nextCol]
    )
  }
}
