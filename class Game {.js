class Game {
  constructor() {
    this.victory = false;
  }

  start() {
    console.log("Welcome to my text Adventure Game!");
    console.log("You're walking home from the pub 13 pints down absolutely blindo and you find yourself in a dark forest and must find your way out.");
    console.log("Do you go left or right?");

    this.chooseDirection();
  }

  chooseDirection() {
    const direction = prompt();

    if (direction === "left") {
      console.log("You come across a dangerous looking monster! the monster turns to you and in gruff voice says 'You want some? I'll give it ya!' Do you fight or run?");
      this.chooseAction();
    } else if (direction === "right") {
      console.log("You stumble upon a purse. Do you open it or leave it?");
      this.choosePurseAction();
    }
  }

  chooseAction() {
    const action = prompt();

    if (action === "fight") {
      console.log("You give the monster a kicking for giving it the biggun and search his pockets for any cash and some fags, you light one up and stumble off to find the exit to the forest.");
      this.victory = true;
    } else if (action === "run") {
      console.log("You try to run but the monster catches you. Game over.");
    }
  }

  choosePurseAction() {
    const action = prompt();

    if (action === "open") {
      console.log("The purse was a trap and the rozzers hop out the bushes and arrest you for theft. Game over.");
    } else if (action === "leave") {
      console.log("You leave the purse and eventually find the exit to the forest.");
      this.victory = true;
    }
  }

  end() {
    if (this.victory) {
      console.log("Congratulations! You made it home, it's past midnight though so your missus is fuming.");
    } else {
      console.log("Better luck next time. You lose the game.");
    }
  }
}

const game = new Game();
game.start();
game.end();