/*

1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9

*/

var boardTemplate = {
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
  9: ''
}

var winningCombinations = [
  [1, 2, 3],
  [1, 5, 9],
  [1, 4, 7],
  [4, 5, 6],
  [7, 8, 9],
  [3, 6, 9],
  [3, 5, 7],
  [2, 5, 8] //but we want to use functional rather than iterative approach so let's see
];

class Player {
  constructor(name, markType) {
    this.name = name;
    this.moves = [];
    this.mark = markType;
    this.makeMove = (position) => {
      this.moves.push(position);
    }
  }
};

class Board {
  constructor() {
    this.board = boardTemplate;
    this.markBoard = (position, mark) => {
        this.board[position] = mark.toUpperCase();
    };
  }
}

printBoard = (boardObj) => {
    let board = boardObj;
    console.log('\n' +
        ' ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
        ' ---------\n' +
        ' ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
        ' ---------\n' +
        ' ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n');
};

class Game {
  constructor(p1, p2, board) {
    this.playerOne = p1;
    this.playerTwo = p2;
    this.board = board;
    this.inProgress = true;
    this.whoseTurn = p1;
    this.winner = null;
    this.toggleTurn = () => {
      this.whoseTurn === p1.name ? this.whoseTurn = p2.name : this.whoseTurn = p1.name;
    }
  }
}

var p1 = new Player('PlayerUno', 'X');
var p2 = new Player('PlayerDos', 'O');
var board = new Board();
var game = new Game(p1, p2, board);
console.log('GAME', game)
printBoard(game.board.board)

const prompt = require('prompt');

startTurn = () => {

    console.log(`${game.whoseTurn.name} it is your turn!!! Enter a number to place your ${game.whoseTurn.mark}`)
    prompt.start();
    prompt.get(['position'], (err, result) => {
      var pos = result.position;
      console.log(`${game.whoseTurn.name} placed an ${game.whoseTurn.mark} on ${pos}`);
      game.whoseTurn.makeMove(pos);
      game.board.markBoard(pos, game.whoseTurn.mark);
      printBoard(game.board.board)
      game.toggleTurn();
    })

}

startGame = () => {
  // should be while but that causes infinite loop as of now
  if (game.inProgress) {
    startTurn();
  }
}

startGame();
