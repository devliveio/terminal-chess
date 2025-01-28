import { Game } from './src/modules/game'

const game = new Game()

game.board.print()

game.makeMove('e4')

game.board.print()

game.makeMove('e5')

game.board.print()
