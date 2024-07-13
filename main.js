const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
let newLocation = { locRow: 0, locCol: 0 };
let playerLocation = { locRow: 0, locCol: 0 };

let endGame = false;

class Field {
  constructor(field) {
    this._field = field;
  }

  print() {
    let fieldRow = "";

    for (let i = 0; i < this._field.length; i++) {
      for (let j = 0; j < this._field[i].length; j++) {
        fieldRow += this._field[i][j];
      }
      console.log(fieldRow);
      fieldRow = "";
    }
  }

  checkInput(input) {
    if (input !== "u" && input !== "d" && input !== "l" && input !== "r") {
      console.log("Incorrect input");
      return false;
    } else {
      return true;
    }
  }

  getFieldSize() {
    return { rows: this._field.length, cols: this._field[0].length };
  }

  moveCharacter(location) {
    if (
      location.locRow < 0 ||
      location.locRow >= this.getFieldSize().rows ||
      location.locCol < 0 ||
      location.locCol >= this.getFieldSize().cols
    ) {
      console.log("Out of bounds. Game Over");
      endGame = true;
      return;
    } else if (this._field[location.locRow][location.locCol] === "O") {
      console.log("You fell in a hole!");
      console.log("Game Over");
      endGame = true;
      return;
    } else if (this._field[location.locRow][location.locCol] === "*") {
      console.log("No Backtracking. Choose another move!");
      newLocation.locRow = playerLocation.locRow;
      newLocation.locCol = playerLocation.locCol;
      return;
    } else if (this._field[location.locRow][location.locCol] === "^") {
      console.log("You Found Your Hat!");
      console.log("You Win");
      endGame = true;
      return;
    } else {
      this._field[location.locRow][location.locCol] = pathCharacter;
      playerLocation.locRow = newLocation.locRow;
      playerLocation.locCol = newLocation.locCol;
    }
  }

  static generateField(rows, cols) {
    let newField = [];
    let hatRow = rows - 1;
    let hatCol = Math.floor(Math.random() * cols - 1);

    for (let i = 0; i < rows; i++) {
      newField[i] = [];
      for (let j = 0; j < cols; j++) {
        newField[i][j] = [fieldCharacter];
      }
    }

    newField.forEach((element) => {
      element[Math.floor(Math.random() * element.length - 1)] = hole;
    });

    newField[0][0] = pathCharacter;
    newField[hatRow][hatCol] = hat;
    return newField;
  }
}

let myField = new Field(Field.generateField(10, 20));

while (!endGame) {
  newLocation.locRow = playerLocation.locRow;
  newLocation.locCol = playerLocation.locCol;
  myField.print();

  let input = prompt(
    "Please, make a move using u, d, l, or r (Ctl+C to Quit): "
  ).toLowerCase();

  if (myField.checkInput(input)) {
    switch (input) {
      case "u":
        newLocation.locRow--;
        break;

      case "d":
        newLocation.locRow++;
        break;

      case "l":
        newLocation.locCol--;
        break;

      case "r":
        newLocation.locCol++;
    }
    try {
      myField.moveCharacter(newLocation);
    } catch (error) {
      console.log(error);
    }
  }
}
