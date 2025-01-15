import { ChessTile, Color } from "."

export interface Piece {
    id:string
    color:Color
    move(from:ChessTile,to:ChessTile,chessBoard?:ChessTile[][]):boolean 
}