'use strict'

// elements
const newGameButton = document.querySelector('.new-game-btn');
const rollButton = document.querySelector('.roll-btn');
const holdButton = document.querySelector('.hold-btn');

const currentScorePlayer1 = document.querySelector('#current-score-player-1');
const savedScorePlayer1 = document.querySelector('#saved-score-player-1');

const currentScorePlayer2 = document.querySelector('#current-score-player-2');
const savedScorePlayer2 = document.querySelector('#saved-score-player-2');

const diceEl = document.querySelector('.main-dice');

// variables
let selectedPlayer = 0;
let diceValue, currentScore = 0, savedScores = [0, 0];


// functions


const rollDice = () => {
  diceValue = Math.floor(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `./images/dice-${diceValue}.png`;
  
  if (diceValue === 1) {
    currentScore = 0;
    switchPlayer();
  } else {
    currentScore += diceValue;
    (selectedPlayer === 0) ? (currentScorePlayer1.innerText = currentScore) : (currentScorePlayer2.innerText = currentScore);
  }

}

const holdDice = () => {
  if (selectedPlayer === 0) {
    savedScores[0] += currentScore;
    savedScorePlayer1.innerText = savedScores[0];
  }
  else {
    savedScores[1] += currentScore;
    savedScorePlayer2.innerText = savedScores[1];
  }
  currentScore = 0;
  if (savedScores[selectedPlayer] >= 50) {
    diceEl.classList.add('hidden');
    
    document.querySelector(`.player-${selectedPlayer+1}`).classList.add('winner');
    document.querySelector(`.player-${selectedPlayer+1}`).classList.remove('active');

    document.querySelector('.winner-text').classList.remove('hidden');
    document.querySelector('.winner-text').textContent = '👾 ' + document.querySelector(`#p${selectedPlayer+1}`).innerText + ' wins!';

    rollButton.onclick = null;
  }
  else {
    switchPlayer();
  }
}


const switchPlayer = () => {
  currentScorePlayer1.innerText = 0;
  currentScorePlayer2.innerText = 0;
  selectedPlayer = (selectedPlayer === 0) ? 1 : 0;
  document.querySelector('.player-1').classList.toggle('active');
  document.querySelector('.player-2').classList.toggle('active');
  diceEl.classList.add('hidden');
}

const init =()=>{
  selectedPlayer = 0;
  diceValue = 0;
  currentScore = 0;
  savedScores = [0, 0];
  currentScorePlayer1.innerText = 0;
  currentScorePlayer2.innerText = 0;
  savedScorePlayer1.innerText = 0;
  savedScorePlayer2.innerText = 0;
  diceEl.classList.add('hidden');
  if(document.querySelector('.winner')){
    document.querySelector('.winner').classList.remove('winner');
  }
  if(document.querySelector('.active')){
    document.querySelector('.active').classList.remove('active');
  }
  document.querySelector('.player-1').classList.add('active');
  document.querySelector('.winner-text').classList.add('hidden');
  document.querySelector('.winner-text').innerText = '';
  rollButton.onclick = rollDice;
}

//rules and 1st phase
function closeModal(){
  document.querySelector('.rules-container').classList.add('hidden');
  document.querySelector('.game-container').classList.remove('hidden');
  console.log('hi');
}
function play(){
  let p1_name = document.querySelector('.player-1-name').value;
  let p2_name = document.querySelector('.player-2-name').value;
  let errorMessage = '';
  let t1 = true, t2 = true;
  if(p1_name.trim() === ''){
    errorMessage = "player-1 can't be empty! ";
    t1 = false;
  }
  if(p2_name.trim() === ''){
    errorMessage = "player-2 can't be empty! ";
    t2 = false;
  }
  if(t1 && t2){
    document.getElementById('p1').innerText = p1_name;
    document.getElementById('p2').innerText = p2_name;
    closeModal();
  }else{
    document.querySelector('.error-message').innerText = errorMessage;
  }
}
init();
//events

// rollButton.addEventListener('click', rollDice);
rollButton.onclick = rollDice;
holdButton.onclick = holdDice;
newGameButton.onclick = init;

//rules and 1st phase
