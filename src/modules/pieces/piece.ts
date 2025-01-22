import { PieceColor } from "../../shared/types";
import { Board } from "../board";

export abstract class Piece {
    
    constructor(public color:PieceColor,public value:number){
        this.color = color
        this.value = value
    }

    public abstract move(board:Board, destination:[number,number]):void
}