import { Game } from './src/modules/game'

const game = new Game()

game.makeMove('e4')

game.makeMove('e5')

console.clear()

game.board.print()