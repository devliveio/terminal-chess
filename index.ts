import { Game } from './src/modules/game'

const game = new Game()

game.board.print()

game.makeMove('e4')

game.makeMove('e5')

game.makeMove('Nc3')

game.makeMove('Nc6')

game.makeMove('Qh5')

game.makeMove('Qh4')

game.makeMove('Qxh4')

game.makeMove('Ke7')

game.makeMove('d4')

game.makeMove('Nxd4')

game.makeMove('Bh6')

game.makeMove('gxh6')

game.makeMove('Rd1')

game.board.print()
