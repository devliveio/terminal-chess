import { PieceType } from "../types";

export const stringToPieceType: { [key: string]: PieceType } = {
  P: PieceType.PAWN,
  N: PieceType.KNIGHT,
  B: PieceType.BISHOP,
  R: PieceType.ROOK,
  Q: PieceType.QUEEN,
  K: PieceType.KING,
  
};
