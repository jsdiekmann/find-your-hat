const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const currentPosition = '$';


class Field {
    constructor(field) {
        this.field = field;
        this.rowPosition = 0;
        this.columnPosition = 0;
        this.name = '';
        this.finished = false;
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
const myField = new Field([
    [currentPosition, fieldCharacter, fieldCharacter, hole],
    [fieldCharacter, hat, fieldCharacter, hole],
    [hole, hole, fieldCharacter, fieldCharacter]
]);

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