const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');

class Game {
  constructor() {
    this.round = null;
  }

  start() {
  let cards = [];
  prototypeQuestions.forEach(question => {
    let card = new Card(question['id'], question['question'], question['answers'], question['correctAnswer'])
    cards.push(card);
  });
  const deck = new Deck(cards);
  this.round = new Round(deck);
  this.printMessage(deck, this.round);
  this.printQuestion(this.round);
}


  printMessage(deck, round) {
      console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }

  printQuestion(round) {
      util.main(round);
  }
}

module.exports = Game;
