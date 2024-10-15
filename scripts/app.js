"use strict";

//? ============================================== Set Global Vars ====================================
const hiddenClassName = "hidden";
const eventName = "click";
const player1Num = 1;
const player2Num = 2;
let currentDiceEle;
let p1_currentScore = 0;
let p2_currentScore = 0;
let p1_totalScore = 0;
let p2_totalScore = 0;
//? =============================================== Select Elements ======================================

// Select Players Data
const player_1 = document.querySelector(`.player-${player1Num}`);
const player_2 = document.querySelector(`.player-${player2Num}`);

const player_1_TotalScoreEle = document.querySelector(
  `.player-${player1Num} .total-score`
);
const player_2_TotalScoreEle = document.querySelector(
  `.player-${player2Num} .total-score`
);
const player_1_CurrentScoreEle = document.querySelector(
  `.player-${player1Num} .current-score`
);
const player_2_CurrentScoreEle = document.querySelector(
  `.player-${player2Num} .current-score`
);

// Select Btns
const btn_NewGame = document.querySelector("#newGameBtn");
const btn_RollDice = document.querySelector("#rollBtn");
const btn_Hold = document.querySelector("#holdBtn");

// Select Dices
const allDices = document.querySelectorAll(".dice");

// Select Modal

//? ========================================= Add Events to Buttons =======================================
const addNewGameEvent = () => {
  btn_NewGame.addEventListener(eventName, function () {
    resetGame();
  });
};

const addRollDiceEvent = () => {
  btn_RollDice.addEventListener(eventName, function () {
    //TODO: Get New Dice Number
    let diceNum = getRandomDiceNumber();
    displayDiceByNum(diceNum);
    let activePlayer = getActivePlayer();
    let activePlayerNum = activePlayer.classList.contains(
      `player-${player1Num}`
    )
      ? 1
      : 2;
    if (diceNum === 1) {
      //Reset Current Score of the prev player & Switch Player
      clearCurrentScoreOfPlayer(activePlayerNum);
      switchToPlayerNum(activePlayerNum == 1 ? 2 : 1);
      return;
    }
    // Add dice roll to current score of active palyer
    updateCurrentScoreOfPlayer(activePlayerNum, diceNum);
  });
};

const addHoldEvent = () => {
  btn_Hold.addEventListener(eventName, function () {
    //TODO: Add the current to the total + reset current then switch player
    let activePlayer = getActivePlayer();
    let activePlayerNum = activePlayer.classList.contains(
      `player-${player1Num}`
    )
      ? 1
      : 2;

    let newScore = updateTotalScoreOfPlayer(activePlayerNum);
    clearCurrentScoreOfPlayer(activePlayerNum);
    newScore >= 100
      ? displayWinner(activePlayerNum)
      : switchToPlayerNum(activePlayerNum == 1 ? 2 : 1);
  });
};

//? ======================================= Assign Events To Buttons ======================================
const assignEventsToBtns = function () {
  addNewGameEvent();
  addHoldEvent();
  addRollDiceEvent();
};

//? ===================================== Run start function ==============================================
(function () {
  assignEventsToBtns();
})();

//? ======================================= Utilities ===============================================

function getRandomDiceNumber() {
  return Math.trunc(Math.random() * 6) + 1;
}

function hideLastCurrentDice() {
  currentDiceEle?.classList.add(hiddenClassName);
}

function displayDiceByNum(diceNum) {
  hideLastCurrentDice();
  for (let i = 0; i < allDices.length; i++) {
    if (allDices[i].classList.contains(`dice-${diceNum}`)) {
      allDices[i].classList.remove(hiddenClassName);
      currentDiceEle = allDices[i];
      break;
    }
  }
}

function switchToPlayerNum(playerNum) {
  // Switch To Specific Player
  if (playerNum === player1Num) {
    player_1.classList.add("active");
    player_2.classList.remove("active");
  } else {
    player_1.classList.remove("active");
    player_2.classList.add("active");
  }
}

function displayWinner(playerNum) {
  //1- Display Winner Message

  //2- Reset Game
  resetGame();
}

function getActivePlayer() {
  return document.querySelector(".player.active");
}

function clearCurrentScoreOfPlayer(playerNum) {
  if (playerNum === player1Num) {
    p1_currentScore = 0;
    player_1_CurrentScoreEle.textContent = 0;
  } else {
    p2_currentScore = 0;
    player_2_CurrentScoreEle.textContent = 0;
  }
}

function updateCurrentScoreOfPlayer(playerNum, score) {
  let newScore;
  if (playerNum === player1Num) {
    newScore = p1_currentScore + score;
    p1_currentScore = newScore;
    player_1_CurrentScoreEle.textContent = newScore;
  } else {
    newScore = p2_currentScore + score;
    p2_currentScore = newScore;
    player_2_CurrentScoreEle.textContent = newScore;
  }
  return newScore; // return the updated score
}
function updateTotalScoreOfPlayer(playerNum) {
  let newScore;
  if (playerNum === player1Num) {
    newScore = p1_totalScore + p1_currentScore;
    p1_totalScore = newScore;
    player_1_TotalScoreEle.textContent = newScore;
  } else {
    newScore = p2_totalScore + p2_currentScore;
    p2_totalScore = newScore;
    player_2_TotalScoreEle.textContent = newScore;
  }
  return newScore; // return the updated score
}

function resetGame() {
  //1- Reset Current Score For Players
  p1_currentScore = 0;
  p2_currentScore = 0;
  player_1_CurrentScoreEle.textContent = 0;
  player_2_CurrentScoreEle.textContent = 0;
  //2- Reset Total Score For Players
  p1_totalScore = 0;
  p2_totalScore = 0;
  player_1_TotalScoreEle.textContent = 0;
  player_2_TotalScoreEle.textContent = 0;
  //3- Hide Current Dice
  hideLastCurrentDice();
  //4- Make Active Player Is Player 1
  switchToPlayerNum(1);
}
