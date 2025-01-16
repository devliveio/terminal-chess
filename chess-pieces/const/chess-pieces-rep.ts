import { PieceType } from "../types"

export const CHESS_PIECES_REP:{[key in PieceType]:string[]} = {
    "pawn"  :["♟", "♙"],
    "bishop":["♝","♗"],
    "rook"  :[ "♜","♖"],
    "king"  :["♚", "♔"],
    "queen" :["♛","♕"],
    "knight":["♞","♘"]
}

