'use strict';
//Initializing all variables
const section0 = document.querySelector('.player--0');
const section1 = document.querySelector('.player--1');

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');

const dice = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holDice = document.querySelector('.btn--hold');

const curr0 = document.getElementById('current--0');
const curr1 = document.getElementById('current--1');

let activePlayer, sum, playing, scores;

const init = function () {
  section0.classList.remove('player--winner');
  section1.classList.remove('player--winner');
  section0.classList.add('player--active');
  section1.classList.remove('player--active');
  document.querySelector(`#score--0`).style.fontSize = '8rem';
  document.querySelector(`#score--1`).style.fontSize = '8rem';
  document.querySelector(`#name--0`).textContent = 'Player 1';
  document.querySelector(`#name--1`).textContent = 'Player 2';
  activePlayer = 0;
  scores = [0, 0];
  sum = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add('hidden');
  curr0.textContent = 0;
  curr1.textContent = 0;
};

init();

//Function for switching player
const switcher = function () {
  sum = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  section0.classList.toggle('player--active');
  section1.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};
//Dice is rolled
rollDice.addEventListener('click', function () {
  if (playing) {
    console.log(activePlayer);
    //Generate random value
    let diceVal = Math.trunc(Math.random() * 6 + 1);

    //Display the dice
    dice.classList.remove('hidden');
    if (diceVal === 0) dice.src = `dice-${diceVal + 1}.png`;
    else dice.src = `dice-${diceVal}.png`;

    //if 1 isn't rolled
    if (diceVal !== 1) {
      sum += diceVal;
      document.getElementById(`current--${activePlayer}`).textContent = sum;
    }
    //If 1 is rolled
    else {
      switcher();
    }
  }
});

//Payer holds
holDice.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += sum;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Game won
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(
        `#score--${activePlayer}`
      ).textContent = `${scores[activePlayer]} Points`;
      document.querySelector(`#score--${activePlayer}`).style.fontSize = '6rem';
      document.querySelector(
        `#name--${activePlayer}`
      ).textContent = `Winner! 🏆`;
    }

    //Game going on
    else {
      switcher();
    }
  }
});

//New game or reset
newGame.addEventListener('click', init);
