import { Piece } from "."

export interface ChessPiecesFactory {
    createPiece(id:string, startPosition:[number,number]):Piece
}
