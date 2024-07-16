export class Field {
  static hat = "^";
  static hole = "O";
  static fieldCharacter = "░";
  static pathCharacter = "*";
  playerLocation = { locRow: 0, locCol: 0 };
  gameOver = false;
  gameOverMessage = "";
  constructor(field) {
    this._field = field;
  }

  print() {
    let fieldRow = "";
    // clear screen
    process.stdout.write("\x1Bc");
    for (let i = 0; i < this._field.length; i++) {
      for (let j = 0; j < this._field[i].length; j++) {
        fieldRow += this._field[i][j];
      }
      process.stdout.write(fieldRow + " \n");
      fieldRow = "";
    }
  }

  getFieldSize() {
    return { rows: this._field.length, cols: this._field[0].length };
  }

  moveCharacter(input) {
    let newLocation = { ...this.playerLocation };

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

    if (
      newLocation.locRow < 0 ||
      newLocation.locRow >= this.getFieldSize().rows ||
      newLocation.locCol < 0 ||
      newLocation.locCol >= this.getFieldSize().cols
    ) {
      this.gameOverMessage = "Out of bounds. Game Over";
      this.gameOver = true;
      return;
    } else if (this._field[newLocation.locRow][newLocation.locCol] === "O") {
      this.gameOverMessage = "You fell in a hole!\nGame Over";
      this.gameOver = true;
      return;
    } else if (this._field[newLocation.locRow][newLocation.locCol] === "*") {
      console.log("No Backtracking. Choose another move!");
      return;
    } else if (this._field[newLocation.locRow][newLocation.locCol] === "^") {
      this.gameOverMessage = "You Found Your Hat!\nYou Win";
      this.gameOver = true;
      return;
    } else {
      this._field[newLocation.locRow][newLocation.locCol] = Field.pathCharacter;
      this.playerLocation = newLocation;
      this.print();
      console.log(this.playerLocation);
    }
  }

  static generateField(rows, cols) {
    let newField = [];
    let hatRow = rows - 1;
    let hatCol = Math.floor(Math.random() * cols - 1);

    for (let i = 0; i < rows; i++) {
      newField[i] = [];
      for (let j = 0; j < cols; j++) {
        newField[i][j] = [Field.fieldCharacter];
      }
    }

    newField.forEach((element) => {
      element[Math.floor(Math.random() * element.length - 1)] = Field.hole;
    });

    newField[0][0] = Field.pathCharacter;
    newField[hatRow][hatCol] = Field.hat;
    return newField;
  }
}
