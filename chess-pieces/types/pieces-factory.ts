import { Piece } from "."

export interface ChessPiecesFactory {
    createPiece(id:string):Piece
}
