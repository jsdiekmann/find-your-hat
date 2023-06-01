const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const currentPosition = '$';
let possibleSpaces = [hole, fieldCharacter, fieldCharacter];


class Field {
    constructor(field) {
        this.field = field;
        this.rowPosition = field.rowPosition ?? 0;
        this.columnPosition = field.columnPosition ?? 0;
        this.name = '';
        this.finished = false;
    }


    // Generates a random game board based on height and width inputs from the user
    static generateField(height, width) {
    
        let newField = [];
        
        for(let i  = 0; i < height; i++) {
            newField.push([]);
            for(let j = 0; j < width; j++) {
                const index = possibleSpaces[Math.floor(Math.random() * possibleSpaces.length)]
                newField[i].push(index);
            }
        }
        
        newField[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = hat;
        
        this.rowPosition = Math.floor(Math.random() * height);
        this.columnPosition = Math.floor(Math.random() * width);
        console.log(this.rowPosition, this.columnPosition);
        newField[this.rowPosition][this.columnPosition] = currentPosition;
        return newField;
    }

/*     static checkField(field) {
        if(field.includes(hat)) {
        for(let i = 0; i < height; i++) {
            for(let j = 0; j < width; j++) {
                if(field[i][j] == fieldCharacter || field[0][0]) {
                    if(field[i-1][j] != fieldCharacter || field[i-1][j] != hat || field[i+1][j] != fieldCharacter || field[i+1][j] != hat || field[i][j-1] != fieldCharacter || field[i][j-1] != hat || field[i][j+1] != fieldCharacter || field[i][j+1] != hat) {
                        return false;
                    }
                }
            }
        }
    } else {
        return false;
    }
 }*/
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

        if(positionInput.toLowerCase() == "d") {
            moveAllowed = (this.rowPosition + 1 < this.field.length);
        }

        if(positionInput.toLowerCase() == "u") {
            moveAllowed = (this.rowPosition - 1 >= 0);
        }

        if(positionInput.toLowerCase() == "r") {
            moveAllowed = (this.columnPosition + 1 < this.field[0].length);
        }

        if(positionInput.toLowerCase() == "l") {
            moveAllowed = (this.columnPosition - 1 >= 0);
        }

        return moveAllowed;
        
    }

    makeMove(positionInput, moveAllowed) {

        let exitStatement = null;
        
        if (moveAllowed == true) {
        this.field[this.rowPosition][this.columnPosition] = pathCharacter;

        if(positionInput.toLowerCase() == "d") {
            ++this.rowPosition;
        }

        if(positionInput.toLowerCase() == "u") {
            --this.rowPosition;
        }

        if(positionInput.toLowerCase() == "r") {
            ++this.columnPosition;
        }

        if(positionInput.toLowerCase() == "l") {
            --this.columnPosition;
        }

        if(this.field[this.rowPosition][this.columnPosition] == hat) {
            exitStatement = `Nice ${this.name}, you found your hat! Now no one has to look at that bird's nest you call a haircut!\n`;
        }
    
        if(this.field[this.rowPosition][this.columnPosition] == hole) {
            exitStatement = `${this.name}, watch where you're going, you just fell down a hoooooooooooooooooooooooooooooooooooooooooole!\n`;
        }

        this.field[this.rowPosition][this.columnPosition] = currentPosition;

    } else {
        return;
    }
        return exitStatement
    }
 
    print() {
        console.clear();
        let board = ''
        for(let i=0; i<this.field.length; i++) {
            board = board.concat(this.field[i].join(''),'\n');
        }

        return board;
    } 

    endGame(exitStatement) {
        if(exitStatement) {
            return true;
        }
        return false;
    }

}

const height = prompt("How many rows do you want your board to have? ");
const width = prompt("How many columns do you want your board to have? ");
let newField = Field.generateField(height, width);

const myField = new Field(newField);
    console.log(myField.rowPosition, myField.columnPosition)
    const name = myField.getName();
    console.log(`Hi there, ${name}! Looks like your haircut game is pretty wack, let's find you a hat to cover that up!`);
    console.log(myField.print());
    const playGame = () => {
        const move = myField.getMove();
        const allowed = myField.moveAllowed(move);
        const makeMove = myField.makeMove(move, allowed);
        console.log(myField.print().toString());
        if(allowed == false) {
            console.log("That move will take you outside the board, please make another selection!\n")
        };
        const exit = myField.endGame(makeMove);
        exit ? console.log(makeMove): playGame();
    };

    playGame();