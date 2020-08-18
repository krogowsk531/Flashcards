const Turn = require('./Turn');

class Round {
  constructor(deck) {
    this.deckCards = deck.cards;
    this.turns = 0;
    this.incorrectGuesses = [];
  }
  returnCurrentCard() {
    return this.deckCards[this.turns]
  }
  takeTurn(guess) {
    const card = this.deckCards[this.turns];
    this.turns ++;
    const turn = new Turn(guess, card);
    if (!turn.evaluateGuess()) {
      this.incorrectGuesses.push(card.id);
    }
    return turn.giveFeedback();
  }

  calculatePercentCorrect() {
    return Math.floor(((this.turns - this.incorrectGuesses.length) / this.turns) * 100);
  }

  endRound() {
    console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`);
    return process.exit();
  }
}

module.exports = Round;
