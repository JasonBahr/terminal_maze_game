import { Field as HatGame } from "./Field.js";

// Set raw mode to capture arrow key input
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

const hatGame = new HatGame(HatGame.generateField(10, 20));
hatGame.print();

process.stdin.on("data", function (key) {
  if (key == "\u001B\u005B\u0041") {
    hatGame.moveCharacter("u");
  }
  if (key == "\u001B\u005B\u0043") {
    hatGame.moveCharacter("r");
  }
  if (key == "\u001B\u005B\u0042") {
    hatGame.moveCharacter("d");
  }
  if (key == "\u001B\u005B\u0044") {
    hatGame.moveCharacter("l");
  }

  if (key == "\u0003") {
    process.exit();
  } // ctrl-c

  if (hatGame.gameOver) {
    console.log(hatGame.gameOverMessage);
    process.exit();
  }
});
