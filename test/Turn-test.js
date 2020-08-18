const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Turn = require('../src/Turn');

describe('Turn', function() {
  let card, guess1, guess2, turn1, turn2;
  beforeEach(function() {
    card = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    guess1 = 'A users guess';
    guess2 = 'sea otter';
    turn1 = new Turn(guess1, card);
    turn2 = new Turn(guess2, card)

  });

  it('should be a function', function() {
    expect(Turn).to.be.a('function');
  });

  it('should be an instance of Turn', function() {
    expect(turn1).to.be.an.instanceof(Turn);
  });

  it('should return a users guess', function() {
    expect(guess1).to.equal(turn1.returnGuess());
    expect(guess2).to.equal(turn2.returnGuess());
  });

  it('should return a flashcard', function() {
    expect(card).to.equal(turn1.returnCard());
    expect(card).to.equal(turn2.returnCard());
  });

  it('should evaluate a users guess', function() {
    expect(turn1.evaluateGuess()).to.equal(false);
    expect(turn2.evaluateGuess()).to.equal(true);
  });

  it('should give feedback', function() {
    expect(turn1.giveFeedback()).to.equal('incorrect!');
    expect(turn2.giveFeedback()).to.equal('correct!');
  });
});
