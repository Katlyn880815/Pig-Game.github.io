'use strict';
//selecting elements
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const diceImg = document.querySelector('.dice');
//selecting currentScore
let current0 = document.getElementById('current--0');
let current1 = document.getElementById('current--1');
//selecting the dices
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//selecting Player
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');

//Let big scores set to 0
score0.textContent = 0;
score1.textContent = 0;
//Remove the dice img whenever start the game or reload the page
diceImg.classList.add('hidden');

//store an array for big scores
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
//function Switch Player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const resetGame = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  // current0.textContent = '0';
  // current1.textContent = '0';
  diceImg.classList.add('hidden');
  scores = [0, 0];
  currentScore = 0;
  current0 = 0;
  current1 = 0;
  activePlayer = 0;
  playing = true;
  player1.classList.remove('player--active', 'player--winner');
  player0.classList.remove('player--winner');
  player0.classList.add('player--active');
};

//Rolling dice
btnRoll.addEventListener('click', function () {
  //1. add a generate random number
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;

    //2. display the diceImg according its number
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${dice}.png`;
    //3. check if it is 1;
    if (dice !== 1) {
      //false : add dice number to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //true : switch player
      switchPlayer();
    }
  }
});

//Hold the dice number
btnHold.addEventListener('click', function () {
  //1. add current score to total score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      //2. if score >= 100 --> finish the game
      playing = false; //finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      //3. if not --> switch the player
      switchPlayer();
    }
  }
});

//reset the dice
btnNew.addEventListener('click', resetGame);
