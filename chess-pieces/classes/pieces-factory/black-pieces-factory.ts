import { ChessPiecesFactory, Piece, Color } from "../../types"

import { Bishop, King, Knight, Pawn, Queen, Rook } from "../chess-pieces"

export class BlackPiecesFactory implements ChessPiecesFactory {

    private color:Color = Color.BLACK

    constructor(){}

    createPiece(id:string,startPosition:[number,number]):Piece {

        const hashPieceCreation:{[key:string]:Piece} = {
            "p":this.createPawn(startPosition),
            "r":this.createRock(startPosition),
            "b":this.createBishop(startPosition),
            "n":this.createKnight(startPosition),
            "q":this.createQueen(startPosition),
            "k":this.createKing(startPosition),
        }

        const piece:Piece|null = hashPieceCreation[id]

        if(!piece) {
            throw new Error(`Piece not found in factory, ${id}`)
        }

        return piece

    }

    private createPawn(startPosition:[number,number]): Pawn {
        return new Pawn(this.color,startPosition)
    }
    private createRock(startPosition:[number,number]): Rook {
        return new Rook(this.color,startPosition)
    }
    private createKnight(startPosition:[number,number]): Knight {
        return new Knight(this.color,startPosition)
    }
    private createQueen(startPosition:[number,number]): Queen {
        return new Queen(this.color,startPosition)
    }
    private createKing(startPosition:[number,number]): King {
        return new King(this.color,startPosition)
    }
    private createBishop(startPosition:[number,number]): Bishop {
        return new Bishop(this.color,startPosition)
    }
    
}

