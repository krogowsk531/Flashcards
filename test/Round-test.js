const chai = require('chai');
const expect = chai.expect;

const Deck = require('../src/Deck');
const Card = require('../src/Card');
const Round = require('../src/Round');

describe('Round', function() {
  let card1, card2, card3, deck, round;
  beforeEach(function() {
    card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
    deck = new Deck([card1, card2, card3]);
    round = new Round(deck);
  })

  it('should be a function', function() {
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', function() {
    expect(round).to.be.an.instanceof(Round);
  });

  it('should store card objects in an array', function() {
    expect(round.deckCards).to.deep.equal([card1, card2, card3]);
  });

  it('should return the current card played', function() {
    expect(round.returnCurrentCard()).to.equal(card1);
  });

  it('should count the number of turns', function() {
    expect(round.turns).to.equal(0);
    round.takeTurn('capybara');
    expect(round.turns).to.equal(1);
  });

  it('should evaluate if a guess is incorrect and store its id', function() {
    expect(round.incorrectGuesses).to.deep.equal([]);
    round.takeTurn('pug');
    expect(round.incorrectGuesses).to.deep.equal([1]);
    round.takeTurn('spleen');
    expect(round.incorrectGuesses).to.deep.equal([1, 14]);
  });

  it('should return feedback', function() {
    expect(round.takeTurn('sea otter')).to.equal('correct!');
    expect(round.takeTurn('spleen')).to.equal('incorrect!');
  });

  it('should calculate percentage of correct guesses', function() {
    round.takeTurn('sea otter');
    expect(round.calculatePercentCorrect()).to.equal(100);
    round.takeTurn('spleen');
    expect(round.calculatePercentCorrect()).to.equal(50);
  });
});
