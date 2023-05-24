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
    }

    getName() {
        this.name = prompt("What is your name? ");
        return this.name;
    }

    print() {
        for(let i=0; i<this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
        
    }

    userPosition() {
        while(this.field[this.rowPosition][this.columnPosition] != hat && this.field[this.rowPosition][this.columnPosition] != hole) {
            this.field[this.rowPosition][this.columnPosition] = currentPosition;
            const positionInput = prompt("Which direction do you want to go? ");
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
        };

        if(this.rowPosition < 0 || this.rowPosition >= this.field.length || this.columnPosition < 0 || this.columnPosition >= this.field.length) {
            console.log("That move will take you outside the board, please make another selection!");
            return;
        }
    }
    if(this.field[this.rowPosition][this.columnPosition] == hat) {
        console.log(`Nice ${this.name}, you found your hat! Now no one has to look at that bird's nest you call a haircut!`);
    }

    if(this.field[this.rowPosition][this.columnPosition] == hole) {
        console.log(`${this.name}, watch where you're going, you just fell down a hoooooooooooooooooooooooooooooooooooooooooole!`);
    }

}
}

const myField = new Field([
    [pathCharacter, fieldCharacter, hole],
    [fieldCharacter, hat, fieldCharacter],
    [hole, hole, fieldCharacter]
]);

    const name = myField.getName();
    
    const executeGame = () => {
        console.log(`Hi there, ${name}! Looks like your haircut game is pretty wack, let's find you a hat to cover that up!`);
        myField.print();
        myField.userPosition();
    }