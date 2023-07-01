'use strict';

// Selecting elements

const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player1El0 = document.querySelector('.player--0');
const player1El1 = document.querySelector('.player--1');
const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
diceImg.classList.add('hidden');

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El0.classList.toggle('player--active');
  player1El1.classList.toggle('player--active');
}
// *Rolling dice functionality
let scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generat Random Number
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    //   Display dice
    diceImg.classList.remove('hidden');
    diceImg.src = `./image/dice-${diceNum}.png`;

    //   Check for rolled 1: if true, switch to next player
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//* Hold dice functionality

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player Score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      diceImg.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});
//* New dice functionality

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player1El0.classList.add('player--active');
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceImg.classList.add('hidden');
});
