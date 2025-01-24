export enum PieceType {
  PAWN = "P",
  BISHOP = "B",
  ROOK = "R",
  KNIGHT = "N",
  QUEEN = "Q",
  KING = "K",
}

export type PieceColor = "white" | "black"

export const BLACK_PIECES_SYMBOLS: { [key in PieceType]: string } = {
  [PieceType.PAWN]: "♙",
  [PieceType.BISHOP]: "♗",
  [PieceType.ROOK]: "♖",
  [PieceType.KING]: "♔",
  [PieceType.QUEEN]: "♕",
  [PieceType.KNIGHT]: "♘",
};

export const WHITE_PIECES_SYMBOLS: { [key in PieceType]: string } = {
  [PieceType.PAWN]: "♟",
  [PieceType.BISHOP]: "♝",
  [PieceType.ROOK]: "♜",
  [PieceType.KING]: "♚",
  [PieceType.QUEEN]: "♛",
  [PieceType.KNIGHT]: "♞",
};

export const PIECES_VALUES: { [key in PieceType]: number } = {
  [PieceType.PAWN]: 1,
  [PieceType.BISHOP]: 3,
  [PieceType.ROOK]: 5,
  [PieceType.KNIGHT]: 3,
  [PieceType.QUEEN]: 9,
  [PieceType.KING]: 1000,
};
