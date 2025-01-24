
import { PieceColor, PieceType } from "../../shared/types";
import { Board } from "../board";
import { Piece } from "./piece";

export class Knight extends Piece {
    public move(board: Board, startPosition: number[], endPosition: number[]): void {
        throw new Error("Method not implemented.");
    }
    public isMoveValid(board: Board, destination: number[], startPosition: number[], isCapturing: boolean): boolean {
        throw new Error("Method not implemented.");
    }
    
    constructor(color:PieceColor,value:number,type:PieceType) {
        super(color,value,type)

    }


}