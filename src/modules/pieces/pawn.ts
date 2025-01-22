import { Piece } from ".";
import { PieceColor } from "../../shared/types";
import { Board } from "../board";

export class Pawn extends Piece {

    constructor(color:PieceColor,value:number) {
        super(color,value)

    }

    public move(board: Board, destination: [number, number]): void {
        throw new Error("Method not implemented.");
    }

//     import { Color, Piece, PieceType } from "../../types";
// import { CHESS_PIECES_REP } from "../../const";

// const BLACK_PIECES: string = "♙ ♗ ♖ ♔ ♕ ♘";
// const WHITE_PIECES: string = "♟ ♝ ♜ ♚ ♛ ♞ ";
// export class Pawn implements Piece {
//   public type: PieceType = PieceType.PAWN;
//   private hasMoved: boolean = false;
//   public rep: string;
//   public color: Color;
//   private direction: number;
//   public position: [number, number];

//   constructor(color: Color, startPosition: [number, number]) {
//     this.rep =
//       color === Color.WHITE
//         ? CHESS_PIECES_REP[this.type][0]
//         : CHESS_PIECES_REP[this.type][1];
//     this.color = color;
//     this.direction = color === Color.BLACK ? -1 : 1;
//     this.position = startPosition;
//   }

//   isCaptureValid(to: [number, number], chessBoard: string[][]): boolean {
//     const [toRow, toCol] = to;
//     const [fromRow, fromCol] = this.position;

//     return (
//       this.isMovingDiagonally(fromCol, toCol) &&
//       this.isOpponentPiece(toRow, toCol, chessBoard) &&
//       this.isMovingOneForward(fromRow, toRow)
//     );
//   }

//   isMovingDiagonally(fromCol: number, toCol: number): boolean {
//     return Math.abs(fromCol - toCol) === 1;
//   }

//   isOpponentPiece(
//     toRow: number,
//     toCol: number,
//     chessBoard: string[][]
//   ): boolean {
//     return this.color === Color.WHITE
//       ? BLACK_PIECES.includes(chessBoard[toRow][toCol].trim())
//       : WHITE_PIECES.includes(chessBoard[toRow][toCol].trim());
//   }

//   isMoveValid(to: [number, number], chessBoard: string[][]): boolean {
//     const [toRow, toCol] = to;
//     const [fromRow, fromCol] = this.position;

//     if (toCol !== fromCol) return false;

//     return (
//       this.isSpaceFree(toRow, toCol, chessBoard) &&
//       this.isMovingInCol(fromCol, toCol) &&
//       (this.isTwoSpacesRuleAvailable(fromRow, toRow) ||
//         this.isMovingOneForward(fromRow, toRow))
//     );
//   }

//   isMovingInCol(fromCol: number, toCol: number): boolean {
//     return toCol === fromCol;
//   }

//   isTwoSpacesRuleAvailable(fromRow: number, toCol: number): boolean {
//     if (!this.hasMoved && toCol - fromRow === 2 * this.direction) {
//       return true;
//     }
//     return false;
//   }

//   isMovingOneForward(fromRow: number, toRow: number): boolean {
//     if (toRow - fromRow === this.direction) {
//       return true;
//     }

//     return false;
//   }

//   isSpaceFree(toRow: number, toCol: number, board: string[][]): boolean {
//     return board[toRow][toCol].trim() === "";
//   }

//   //TODO:Promotion Logic

//   capture(to: [number, number], chessBoard: string[][]): boolean {
//     if (!this.isCaptureValid(to, chessBoard)) {
//       return false;
//     }

//     return true;
//   }

//   //Pawn moves one space ahead
//   move(to: [number, number], chessBoard: string[][]): Piece | null {
//     if (!this.isMoveValid(to, chessBoard)) {
//       return null;
//     }

//     if (!this.hasMoved) {
//       this.hasMoved = true;
//     }

//     return this;
//   }
// }

}