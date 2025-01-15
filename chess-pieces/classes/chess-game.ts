import { BoardHandler } from ".";

import { Color, Piece } from "../types";

const prompts = require("prompt-sync")();

const BOARD_SIZE = 8;

class ChessGame {
  private boardHandler = new BoardHandler();

  constructor() {}

  main() {
    console.log("¡Bienvenido al ajedrez en la consola");
    let turn: Color = Color.WHITE;

    while (true) {
      this.boardHandler.printBoard();
      console.log(`Turno de ${turn} (ejemplo de movimiento: e2 e4)`);
      const input = prompts("Ingresa tu movimiento: ");
      const [from, to] = input.split(" ");
      if (!from || !to) {
        console.log("Movimiento inválido, intenta de nuevo");
        continue;
      }

      const moveValid = this.movePiece(from, to, turn);

      if (moveValid) {
        turn = turn === Color.WHITE ? Color.BLACK : Color.WHITE;
      }
    }
  }

  notationToCoordinates(notation: string): [number, number] {
    const file = notation.charCodeAt(0) - "a".charCodeAt(0); //Columna
    const rank = parseInt(notation[1]) - 1; // Fila
    return [rank, file];
  }

  movePiece(from: string, to: string, turn: Color): boolean {
    const [fromRow, fromCol] = this.notationToCoordinates(from);
    const [toRow, toCol] = this.notationToCoordinates(to);
    //Revisar si coordenadas están dentro del tablero
    if (
      !this.isCoordinatesInsideBounds(fromRow, fromCol) ||
      !this.isCoordinatesInsideBounds(toRow, toCol)
    ) {
      console.log("Movimiento Inválido:celda fuera del tablero");
      return false;
    }

    const fromCell = this.boardHandler.board[fromRow][fromCol];
    const toCell = this.boardHandler.board[toRow][toCol];

    if(fromRow === toRow && fromCol === toCol) {
      console.log("Movimiento Inválido: Celdas iguales")
      return false
    }

    //Revisar si hay pieza en el tablero
    const piece: Piece | null = this.boardHandler.board[fromRow][fromCol].piece;
    if (!piece) {
      console.log("Movimiento Inválido: No hay pieza en la casilla de origen");
      return false;
    }

    //Revisar si pieza le pertenece a jugador
    if (piece.color !== turn) {
      console.log("Movimiento Inválido: No puedes mover piezas del oponente");
      return false;
    }

    //Mover pieza
    if (!piece.move(fromCell, toCell,this.boardHandler.board)) {
      console.log(`Movimiento Invalido para la pieza`);
      return false;
    }

    //Actualizar mapa
    fromCell.piece = null;
    if (toCell.piece) {
      console.log(`pieza capturada ${toCell.piece.id}`);
    }

    toCell.piece = piece;

    return true;
  }

  isCoordinatesInsideBounds(row: number, col: number): boolean {
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col > BOARD_SIZE) {
      return false;
    }
    return true;
  }
}

const chessGame = new ChessGame();
chessGame.main();
