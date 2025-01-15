import { ChessTile, Piece, Color } from "../../types";

export class Knight implements Piece {
    id: string;
    color: Color;

    constructor(color: Color) {
        this.id = color === Color.BLACK ? "♘" : "♞"
        this.color = color
      }

    move(from: ChessTile, to: ChessTile): boolean {
        throw new Error("Method not implemented.");
    }
    
}