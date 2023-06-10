const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const currentPosition = "$";
let possibleSpaces = [hole, fieldCharacter, fieldCharacter];

class Field {
  constructor(field) {
    this.field = field;
    this.rowPosition = field.start[0] ?? 0;
    this.columnPosition = field.start[1] ?? 0;
    this.name = "";
    this.finished = false;
  }

  // Generates a random game board based on height and width inputs from the user

  static generateField(height, width) {
    let newField = {
      board: [],
      start: [0, 0],
    };

    for (let i = 0; i < height; i++) {
      newField.board.push([]);
      for (let j = 0; j < width; j++) {
        const index =
          possibleSpaces[Math.floor(Math.random() * possibleSpaces.length)];
        newField.board[i].push(index);
      }
    }

    newField.board[Math.floor(Math.random() * height)][
      Math.floor(Math.random() * width)
    ] = hat;

    this.rowPosition = Math.floor(Math.random() * height);
    this.columnPosition = Math.floor(Math.random() * width);

    newField.start = [this.rowPosition, this.columnPosition];
    newField.board[this.rowPosition][this.columnPosition] = currentPosition;
    return newField;
  }

  // Checks to make sure gameboard has a solution
  static checkField(field, start) {
    let queue = [start];
    let visited = [];
    let valid = false;
    while (queue.length > 0) {
      let currentNode = queue.shift();
      if (field[currentNode[0]][currentNode[1]] == hat) {
        valid = true;
        break;
      }
      visited.push(`${currentNode[0]}, ${currentNode[1]}`);
      let upNode = [currentNode[0] - 1, currentNode[1]];
      let downNode = [currentNode[0] + 1, currentNode[1]];
      let rightNode = [currentNode[0], currentNode[1] + 1];
      let leftNode = [currentNode[0], currentNode[1] - 1];

      if (!(upNode[0] < 0) && !visited.includes(`${upNode[0]}, ${upNode[1]}`)) {
        if (
          field[upNode[0]][upNode[1]] == fieldCharacter ||
          field[upNode[0]][upNode[1]] == hat
        ) {
          queue.push(upNode);
        }
      }

      if (
        downNode[0] < field.length &&
        !visited.includes(`${downNode[0]}, ${downNode[1]}`)
      ) {
        if (
          field[downNode[0]][downNode[1]] == fieldCharacter ||
          field[downNode[0]][downNode[1]] == hat
        ) {
          queue.push(downNode);
        }
      }

      if (
        rightNode[0] < field[0].length &&
        !visited.includes(`${rightNode[0]}, ${rightNode[1]}`)
      ) {
        if (
          field[rightNode[0]][rightNode[1]] == fieldCharacter ||
          field[rightNode[0]][rightNode[1]] == hat
        ) {
          queue.push(rightNode);
        }
      }

      if (
        !(leftNode[0] < 0) &&
        !visited.includes(`${leftNode[0]}, ${leftNode[1]}`)
      ) {
        if (
          field[leftNode[0]][leftNode[1]] == fieldCharacter ||
          field[leftNode[0]][leftNode[1]] == hat
        ) {
          queue.push(leftNode);
        }
      }
    }
    return valid;
  }

  getName() {
    this.name = prompt("What is your name? ");
    return this.name;
  }

  getMove() {
    const positionInput = prompt("Which direction do you want to go? ");
    return positionInput;
  }

  moveAllowed(positionInput) {
    let moveAllowed;

    if (positionInput.toLowerCase() == "d") {
      moveAllowed = this.rowPosition + 1 < this.field.board.length;
    }

    if (positionInput.toLowerCase() == "u") {
      moveAllowed = this.rowPosition - 1 >= 0;
    }

    if (positionInput.toLowerCase() == "r") {
      moveAllowed = this.columnPosition + 1 < this.field.board[0].length;
    }

    if (positionInput.toLowerCase() == "l") {
      moveAllowed = this.columnPosition - 1 >= 0;
    }

    return moveAllowed;
  }

  makeMove(positionInput, moveAllowed) {
    let exitStatement = null;

    if (moveAllowed == true) {
      this.field.board[this.rowPosition][this.columnPosition] = pathCharacter;

      if (positionInput.toLowerCase() == "d") {
        ++this.rowPosition;
      }

      if (positionInput.toLowerCase() == "u") {
        --this.rowPosition;
      }

      if (positionInput.toLowerCase() == "r") {
        ++this.columnPosition;
      }

      if (positionInput.toLowerCase() == "l") {
        --this.columnPosition;
      }

      if (this.field.board[this.rowPosition][this.columnPosition] == hat) {
        exitStatement = `Nice ${this.name}, you found your hat! Now no one has to look at that bird's nest you call a haircut!\n`;
      }

      if (this.field.board[this.rowPosition][this.columnPosition] == hole) {
        exitStatement = `${this.name}, watch where you're going, you just fell down a hoooooooooooooooooooooooooooooooooooooooooole!\n`;
      }

      this.field.board[this.rowPosition][this.columnPosition] = currentPosition;
    } else {
      return;
    }
    return exitStatement;
  }

  print() {
    console.clear();
    let board = "";
    for (let i = 0; i < this.field.board.length; i++) {
      board = board.concat(this.field.board[i].join(""), "\n");
    }

    return board;
  }

  endGame(exitStatement) {
    if (exitStatement) {
      return true;
    }
    return false;
  }
}

const height = prompt("How many rows do you want your board to have? ");
const width = prompt("How many columns do you want your board to have? ");
let newField = Field.generateField(height, width);
let validBoard = Field.checkField(newField.board, newField.start);
while (!validBoard) {
  newField = Field.generateField(height, width);
  validBoard = Field.checkField(newField.board, newField.start);
}

const myField = new Field(newField);
console.log(myField);
const name = myField.getName();
console.log(
  `Hi there, ${name}! Looks like your haircut game is pretty wack, let's find you a hat to cover that up!`
);

console.log(myField.print());
const playGame = () => {
  const move = myField.getMove();
  const allowed = myField.moveAllowed(move);
  const makeMove = myField.makeMove(move, allowed);
  console.log(myField.print().toString());
  if (allowed == false) {
    console.log(
      "That move will take you outside the board, please make another selection!\n"
    );
  }
  const exit = myField.endGame(makeMove);
  exit ? console.log(makeMove) : playGame();
};

playGame();
