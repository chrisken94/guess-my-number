"use strict";

// defining the random number
let secretNumber = Math.trunc(Math.random() * 30) + 1,
  // to put the random number in the html content
  numberHtml = document.querySelector(".number"),
  // defining the "user's score" to variable
  scoreHtml = document.querySelector(".score"),
  // defining the "highscore point" to variable
  highScore = document.querySelector(".highscore"),
  // defining the body selector for color
  bodyColor = document.querySelector("body"),
  // defining the "message" to variable
  messageHtml = document.querySelector(".message"),
  // defining the "check button"
  checkButton = document.querySelector(".check"),
  // defining the "again button"
  againButton = document.querySelector(".again");

// to disable the "again" button
againButton.disabled = true;

// to define the user's score in variable in our own code (not depend on DOM) (must be outside the function, if inside the function, the value will always be the same initial value every time the function run) (IMPORTANT LESSON : recommended practice to store data in our own code not depend on the DOM)
let scoreInCode = 5;

// a function to define the message (dry principle)
const displayMessage = function (message) {
  messageHtml.textContent = message;
};
// Function to animate the message
const animMessage = function () {
  if (messageHtml.className === "message") {
    messageHtml.className += " messageAnimate";
  } else {
    messageHtml.className = "message";
  }
};
// Function to animate the fail message
const animMessageFail = function () {
  if (messageHtml.classList.contains("message")) {
    messageHtml.className = "message messageAnimateFail";
  } else {
    messageHtml.className = "message";
  }
};

const checkFunc = function () {
  // define the guess html to variable and convert it to Number format
  const guess = Number(document.querySelector(".guess").value);

  // when there is no guesses/input
  if (!guess) {
    animMessage();
    displayMessage("No Number!");
    // to disable the "again button"
    againButton.disabled = true;
  }
  // when player wins
  else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number!");
    // to change the background color
    bodyColor.style.backgroundColor = "#60b347";
    bodyColor.style.transition = "all 1.5s";
    // to make the square of the number wider
    numberHtml.style.width = "30rem";
    numberHtml.style.transition = "all 1.5s";
    // to show the number
    numberHtml.textContent = secretNumber;
    // to disable the "check" button
    checkButton.disabled = true;
    // to enable the "again button"
    againButton.disabled = false;
    // to set the highscore
    let highScoreNumber = Number(highScore.textContent);
    if (scoreInCode > highScoreNumber) {
      highScore.textContent = scoreInCode;
    }
  }
  // when input guess is wrong (method #1 (dry principle))
  else if (guess !== secretNumber) {
    displayMessage(guess > secretNumber ? "⏫Too high!" : "⏬Too low!");
    animMessage();
    scoreInCode--;
    scoreHtml.textContent = scoreInCode;
    // to disable the "again" button
    againButton.disabled = true;
  }

  // when player's score decreased to zero, telling them they lost the game and disabled the "check" button
  if (scoreInCode === 0) {
    animMessageFail();
    displayMessage("🤯 You lost the game!");
    // to disable the button- preventing from infinite round
    checkButton.disabled = true;
    // to enable the "again button"
    againButton.disabled = false;
  }

  // just for checking
  // console.log(scoreInCode);
};

// the "again" button function
const againFunc = function () {
  // to restore the player's score
  scoreInCode = 5;
  scoreHtml.textContent = scoreInCode;
  // to restore the secret number
  secretNumber = Math.trunc(Math.random() * 30) + 1;
  // to restore the number html back to "?"
  numberHtml.textContent = "?";
  // to restore the number html width back to 15 rem
  numberHtml.style.width = "15rem";
  // to restore the background color
  bodyColor.style.backgroundColor = "#222";
  // to restore the message back to "start guessing..." from "Correct Number"
  displayMessage("Start guessing...");
  if (messageHtml.className === "message") {
    messageHtml.className += " messageAnimate";
  } else {
    messageHtml.className = "message";
  }
  // to restore the guess value back to empty string
  let guess = document.querySelector(".guess");
  guess.value = "";

  // to disable the "again button"
  againButton.disabled = true;

  // to enable the "check button"
  checkButton.disabled = false;

  // just for checking
  // console.log(`${secretNumber} secret`);
};

// the global variable of "guess"
let guess = document.querySelector(".guess");

const triggerButton = function (evt) {
  // triggering the "check!" button with "enter" key in "input" guess of user
  if (evt.keyCode === 13) {
    evt.preventDefault();
    checkButton.click();
  }
  // triggering the "again!" button with "r" key in "input" guess of user
  if (evt.keyCode === 82) {
    evt.preventDefault();
    againButton.click();
  }
};

// number only on input guess
const guessNumOnly = function (evt) {
  let num = String.fromCharCode(evt.which);
  if (!/[0-9]/.test(num)) {
    evt.preventDefault();
  }
};

checkButton.addEventListener("click", checkFunc);
againButton.addEventListener("click", againFunc);
guess.addEventListener("keypress", guessNumOnly);
guess.addEventListener("keyup", triggerButton);
