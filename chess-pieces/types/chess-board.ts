import { Piece } from "."

export interface ChessTile {
    index:number[]
    piece:Piece|null
    print:string
}