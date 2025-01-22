import { PieceType } from "./pieceType";

export interface PlayerMove {
    piece:PieceType,
    ambiguityBreaker:string|null,
    isCapture:boolean,
    destination:string,
}