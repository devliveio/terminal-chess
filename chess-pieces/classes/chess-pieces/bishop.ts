import { ChessTile, Piece, Color } from "../../types";

export class Bishop implements Piece {
    id: string;
    color: Color;

    constructor(color: Color) {
        this.id = color === Color.BLACK ? "♗" : "♝"
        this.color = color
    }

    isValid(from:ChessTile, to:ChessTile):boolean {
        const { index:[toRow,toCol], piece } = to;
        const { index:[fromRow,fromCol]} = from;
        const difRow = toRow - fromRow;
        const difCol = toCol - fromCol;

        //Bishop moves diagonally from where they are (difRow === difCol)
        if(Math.abs(difRow) !== Math.abs(difCol)) {
            console.log("Invalid move for the bishop",to)
            return false
        }

        //Check obstacles along the way
        const stepRow = difRow > 0 ? 1 : -1
        const stepCol = difCol > 0 ? 1 : -1

        let currentRow = fromRow + stepRow
        let currentCol = fromCol + stepCol

        while(currentCol !== toRow && currentCol !== toCol) {
        
        }

        if(to.piece?.color !== this.color) {
            console.log("Bishop capture piece", to.piece)
            return true
        } 

        return false

    }

    move(from: ChessTile, to: ChessTile): boolean {
        throw new Error("Method not implemented.");
    }

    
}