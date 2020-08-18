class Turn {
  constructor(userGuess, flashCard) {
    this.userGuess = userGuess;
    this.flashCard = flashCard;
  }

  returnGuess() {
    return this.userGuess;
  }

  returnCard() {
    return this.flashCard;
  }

  evaluateGuess() {
    return this.userGuess === this.flashCard.correctAnswer
  }

  giveFeedback() {
    if (this.evaluateGuess() === true) {
      return 'correct!'
    } else {
      return 'incorrect!'
    }
  }
}

module.exports = Turn;
