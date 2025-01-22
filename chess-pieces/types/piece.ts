import { Color, PieceType } from "."

export interface Piece {
    type:PieceType
    rep:string,
    color:Color
    position:[number,number]
    move(to:[number,number],chessBoard:string[][]):Piece|null
    capture(to:[number,number],chessBoard:string[][]):boolean
    
}