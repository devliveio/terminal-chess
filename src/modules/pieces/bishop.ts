import { PieceColor } from "../../shared/types";
import { Piece } from "./piece"; // Adjust the path as necessary

import { Board } from "../board";


export class Bishop extends Piece {
    
    constructor(color:PieceColor,value:number) {
        super(color,value)

    }

    public move(board: Board, destination: [number, number]): void {
        throw new Error("Method not implemented.");
    }
}