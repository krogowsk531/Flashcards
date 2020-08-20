
const data = require('./data');
const prototypeQuestions = data.prototypeData;
const inquirer = require('inquirer');
const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');


const genList = (round) => {
  let card = round.returnCurrentCard();

  let choices = card.answers.map((answer, index) => {
    return {
      key: index,
      value: answer
    }
  });
  return {
    type: 'rawlist',
    message: card.question,
    name: 'answers',
    choices: choices
  };
}

const getRound = (round) => {
  return Promise.resolve(round);
}

const confirmUpdate = (id, round) => {
  const feedback = round.takeTurn(id);
  return {
    name: 'feedback',
    message: `Your answer of ${id} is ${feedback}`
  }
}

async function main(round) {

  const currentRound = await getRound(round);
  const getAnswer = await inquirer.prompt(genList(currentRound));
  const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round));

  if(!round.returnCurrentCard() && round.calculatePercentCorrect() >= 90) {
    round.endRound()
    process.exit();
  }

  if(!round.returnCurrentCard()) {
    round.endRound()
    console.log('********************  ** You did not get more than 90% of the questions correct.  Try again!  ** ********************')
    let cards = [];
    prototypeQuestions.forEach(question => {
      let card = new Card(question['id'], question['question'], question['answers'], question['correctAnswer'])
      cards.push(card);
    });
    const deck = new Deck(cards)
    round = new Round(deck)
  }
  main(round);
}

module.exports.main = main;
