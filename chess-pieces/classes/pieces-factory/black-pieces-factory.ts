import { ChessPiecesFactory, Piece, Color } from "../../types"

import { Bishop, King, Knight, Pawn, Queen, Rook } from "../chess-pieces"

export class BlackPiecesFactory implements ChessPiecesFactory {

    private color:Color = Color.BLACK

    constructor(){}

    createPiece(id:string):Piece {

        const hashPieceCreation:{[key:string]:Piece} = {
            "p":this.createPawn(),
            "r":this.createRock(),
            "b":this.createBishop(),
            "n":this.createKnight(),
            "q":this.createQueen(),
            "k":this.createKing(),
        }

        const piece:Piece|null = hashPieceCreation[id]

        if(!piece) {
            throw new Error(`Piece not found in factory, ${id}`)
        }

        return piece

    }

    private createPawn(): Pawn {
        return new Pawn(this.color)
    }
    private createRock(): Rook {
        return new Rook(this.color)
    }
    private createKnight(): Knight {
        return new Knight(this.color)
    }
    private createQueen(): Queen {
        return new Queen(this.color)
    }
    private createKing(): King {
        return new King(this.color)
    }
    private createBishop(): Bishop {
        return new Bishop(this.color)
    }
    
}

