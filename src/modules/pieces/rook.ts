import { Piece } from ".";
import { PieceColor } from "../../shared/types";
import { Board } from "../board";

export class Rook extends Piece {
    
    constructor(color:PieceColor,value:number) {
        super(color,value)

    }

    public move(board: Board, destination: [number, number]): void {
        throw new Error("Method not implemented.");
    }
}