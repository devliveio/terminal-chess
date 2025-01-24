import { Piece } from "../pieces/piece";

export class PieceManager {
    private piecesPosition: { [key in string]: (number[] | null)[] } = {};
  
    public setPiecesLocation(piece: Piece, position: [number, number]): void {
      const index: string = `${piece.color}-${piece.type}`;
      if (this.piecesPosition[index]) {
        this.piecesPosition[index].push(position);
      } else {
        this.piecesPosition[index] = [position];
      }
    }
  
    public updatePiecePosition(index: string, prevPosition: number[], nextPosition: number[]|null): void {
      this.piecesPosition[index] = this.piecesPosition[index].map((position) => 
        position === prevPosition ? nextPosition : position
      );
    }
  
    public eliminatePiece(piece: Piece, piecePosition: number[]): void {
      const index: string = `${piece.color}-${piece.type}`;
      this.piecesPosition[index] = this.piecesPosition[index].filter((position) => position !== piecePosition);
    }
  
    public getPiecesLocation(index: string): (number[] | null)[] {
      return this.piecesPosition[index] || [];
    }
  }