import { ChessPiecesFactory, Color, Piece } from "../../types"

import { Pawn, Rook, Knight, Queen, King, Bishop } from "../chess-pieces"

export class WhitePiecesFactory implements ChessPiecesFactory {

    private color:Color = Color.WHITE

    constructor(){}

    createPiece(id:string, start:[number,number]):Piece {

        const hashPieceCreation:{[key:string]:Piece} = {
            "P":this.createPawn(start),
            "R":this.createRock(start),
            "B":this.createBishop(start),
            "N":this.createKnight(start),
            "Q":this.createQueen(start),
            "K":this.createKing(start),
        }

        const piece:Piece|null = hashPieceCreation[id]

        if(!piece) {
            throw new Error(`Piece not found in factory, ${id}`)
        }

        return piece

    }

    private createPawn(start:[number,number]): Pawn {
        return new Pawn(this.color,start)
    }
    private createRock(start:[number,number]): Rook {
        return new Rook(this.color,start)
    }
    private createKnight(start:[number,number]): Knight {
        return new Knight(this.color,start)
    }
    private createQueen(start:[number,number]): Queen {
        return new Queen(this.color,start)
    }
    private createKing(start:[number,number]): King {
        return new King(this.color,start)
    }
    private createBishop(start:[number,number]): Bishop {
        return new Bishop(this.color,start)
    }
    
}