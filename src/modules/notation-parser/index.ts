import { NotationComponents, PieceType } from "../../shared/types";

export class NotationParser {
  static getNotationComponents(notation: string): NotationComponents | null {
    const notationRegex = /^([KQRBN]?)([a-h]?)(x?)([a-h][1-8])$/;
    const match = notation.match(notationRegex);
    if (!match) {
      return null;
    }
    const [_, piece, ambiguity, capture, destination] = match;

    return {
      piece: piece || PieceType.PAWN,
      ambiguityBreaker: ambiguity || null,
      takeSymbolPresent: capture === "x",
      destination,
    };
  }

  static getPositionFromNotation(notation: string): [number, number] {
    const file = notation.charCodeAt(0) - "a".charCodeAt(0);
    const rank = parseInt(notation[1]) - 1;
    return [rank, file];
  }
}
