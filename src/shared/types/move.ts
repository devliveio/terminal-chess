export type Castling = 'queenSide' | 'kingSide'

export interface NotationComponents {
  piece: string | null
  ambiguityBreaker: string | null
  takeSymbolPresent: boolean
  destination: string
}
