"use strict";

// defining the random number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// to put the random number in the html content
let numberHtml = document.querySelector(".number");

// defining the "user's score" to variable
let scoreHtml = document.querySelector(".score");

// defining the "highscore point" to variable
let highScore = document.querySelector(".highscore");

// defining the body selector for color
let bodyColor = document.querySelector("body");

// defining the "message" to variable
let messageHtml = document.querySelector(".message"),
  // defining the "check button"
  checkButton = document.querySelector(".check"),
  // defining the "again button"
  againButton = document.querySelector(".again");

// to disable the "again" button
againButton.disabled = true;

// to define the user's score in variable in our own code (not depend on DOM) (must be outside the function, if inside the function, the value will always be the same initial value every time the function run) (IMPORTANT LESSON : recommended practice to store data in our own code not depend on the DOM)
let scoreInCode = 20;

const checkFunc = function () {
  // define the guess html to variable and convert it to Number format
  const guess = Number(document.querySelector(".guess").value);

  // when there is no guesses/input
  if (!guess) {
    messageHtml.textContent = "No number!";
    // to disable the "again button"
    againButton.disabled = true;
  }
  // when player wins
  else if (guess === secretNumber) {
    messageHtml.textContent = "🎉 Correct Number!";
    // to change the background color
    bodyColor.style.backgroundColor = "#60b347";
    bodyColor.style.transition = "all 1s";
    // to make the square of the number wider
    numberHtml.style.width = "30rem";
    numberHtml.style.transition = "all 1s";
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
    messageHtml.textContent =
      guess > secretNumber ? "⏫Too high!" : "⏬Too low!";
    scoreInCode--;
    scoreHtml.textContent = scoreInCode;
    // to disable the "again" button
    againButton.disabled = true;
  }

  // // when input guess is too high (method #2 (regular principle))
  // else if (guess > secretNumber) {
  //   messageHtml.textContent = "⏫Too high!";
  //   scoreInCode--;
  //   scoreHtml.textContent = scoreInCode;
  //   // to disable the "again button"
  //   againButton.disabled = true;
  // }
  // // when input guess is too low
  // else if (guess < secretNumber) {
  //   messageHtml.textContent = "⏬Too low!";
  //   scoreInCode--;
  //   scoreHtml.textContent = scoreInCode;
  //   // to disable the "again button"
  //   againButton.disabled = true;
  // }

  // when player's score decreased to zero, telling them they lost the game and disabled the "check" button
  if (scoreInCode === 0) {
    messageHtml.textContent = "🤯 You lost the game!";
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
  scoreInCode = 20;
  scoreHtml.textContent = scoreInCode;
  // to restore the secret number
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  // to restore the number html back to "?"
  numberHtml.textContent = "?";
  // to restore the number html width back to 15 rem
  numberHtml.style.width = "15rem";
  // to restore the background color
  bodyColor.style.backgroundColor = "#222";
  // to restore the message back to "start guessing..." from "Correct Number"
  messageHtml.textContent = "Start guessing...";
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

// number only on input guess
const guessNumOnly = function (evt) {
  let num = String.fromCharCode(evt.which);
  if (!/[0-9]/.test(num)) {
    evt.preventDefault();
  }
};

// trigerring the "check" button with "enter" key in "input guess of user"
guess.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    checkButton.click();
  }
  if (event.keyCode === 82) {
    event.preventDefault();
    againButton.click();
  }
});

document.querySelector(".check").addEventListener("click", checkFunc);
document.querySelector(".again").addEventListener("click", againFunc);
guess.addEventListener("keypress", guessNumOnly);
