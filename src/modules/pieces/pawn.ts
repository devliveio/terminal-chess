import { Piece } from "./piece";
import { PieceColor, PieceType } from "../../shared/types";
import { Board } from "../board";
import { InvalidMoveError } from "../error";
import { MoveValidator } from "../move/validator";

export class Pawn extends Piece {
  private hasMoveOnce: boolean = false;
  private direction: number;
  
  private readonly ADVANCE_STEPS:number = 2
  private readonly NORMAL_STEPS:number = 1
  private readonly CAPTURE_STEPS_COL:number = 1


  constructor(color: PieceColor, value: number, type: PieceType) {
    super(color, value, type);
    this.direction = color === "white" ? 1 : -1;
  }

  public move(
    board: Board,
    startPosition: number[],
    endPosition: number[]
  ): void {
    const capturePiece = board.getPieceAtPosition(endPosition);
    const currentPiece = board.getPieceAtPosition(startPosition);

    if (capturePiece) {
      board.updatePiecePositionInBoard(endPosition, null, capturePiece);
    }

    if (!currentPiece) {
      throw new InvalidMoveError("No piece at the starting position");
    }
    if (!this.hasMoveOnce) {
      this.hasMoveOnce = true;
    }

    return board.updatePiecePositionInBoard(
      startPosition,
      endPosition,
      currentPiece
    );
  }

  private isValidMoveForward(
    startRow: number,
    finalRow: number,
    finalCol: number,
    board: Board
  ): boolean {

    if (!MoveValidator.isColPathFree(startRow,finalRow,finalCol,board)) {
      return false
    }

    if(this.isTwoSpacesRuleAvailable(startRow,finalRow)) {
      return true
    }

    if(MoveValidator.isMovingNSteps(startRow,finalRow,this.NORMAL_STEPS*this.direction)) {
      return true
    }

    return false

  }

  private isValidCapture(
    finalRow: number,
    finalCol: number,
    board: Board,
    hasTakeSymbol: boolean
  ) {
    if (hasTakeSymbol && this.isOpponentPiece(finalRow, finalCol, board)) {
      return true;
    }
    return false;
  }

  private isTwoSpacesRuleAvailable(
    startRow: number,
    finalRow: number
  ): boolean {
    return (
      !this.hasMoveOnce && MoveValidator.isMovingNSteps(startRow, finalRow, this.ADVANCE_STEPS*this.direction)
    );
  }

  isMoveValid(
    board: Board,
    destination: number[],
    startPosition: number[],
    hasTakeSymbol: boolean
  ): boolean {
    const [finalRow, finalCol] = destination;
    const [startRow, startCol] = startPosition;

    if (MoveValidator.isMovingOverCol(startCol, finalCol)) {
      return this.isValidMoveForward(startRow, finalRow, finalCol, board);
    }

    if (MoveValidator.isMovingNStepsDiagonally(startRow,finalRow,startCol,finalCol,this.CAPTURE_STEPS_COL)) {
      return this.isValidCapture(finalRow, finalCol, board, hasTakeSymbol);
    }

    return false;
  }
}
