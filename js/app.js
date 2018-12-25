// Creates list that holds all of the cards and adds event listener to the card deck.
const allCards = ["diamond","diamond","paper-plane-o","paper-plane-o","bolt","bolt","cube","cube","anchor","anchor","leaf","leaf","bicycle","bicycle","bomb","bomb"];

// Declare and initialize variables with global scope
const deckLocation = document.querySelector('ul.deck');

// Add event listeners for immutable elements
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restartGame());

// define changin variables in global scope
let
  movesLeft = 3,
  movesLeftText = document.querySelector('.moves'),
  cardsOpen = 0,
  newElement,
  newSubElement;
restartGame();

// shuffle the card array
function shuffleArray(array) { // shuffle the list of cards using a custom shuffle function
  for (var i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
/*
Restart the game by creating a new card deck in the page's HTML.
The function should execute the following tasks:
- Create HTML elements and sub (child) elements for each card in the array and add to fragment
- Assign the appropriate classes and event listeners
- Replace current HTML .deck elements with newly generated fragment
*/
function restartGame() {
  const newDeckOrder = shuffleArray(allCards);
  const fragment = document.createDocumentFragment();
  for(let i = 0; i < allCards.length; i++) {
    newElement = document.createElement('li');
    newElement.className = "card";
    newElement.addEventListener('click', cardClick);
    newSubElement = document.createElement('i');
    newSubElement.className = "fa fa-" + newDeckOrder[i];
    newElement.appendChild(newSubElement);
    fragment.appendChild(newElement);
  }
  while (deckLocation.firstChild) { // remove current card deck (if applicable)
    deckLocation.removeChild(deckLocation.firstChild);
  }
  deckLocation.appendChild(fragment); // reflow and repaint
  console.log(deckLocation);
  const turnsFailed = document.querySelectorAll('.fa-star-o');
  turnsFailed.forEach( function(emptyStar) {emptyStar.className = "fa fa-star"});
  movesLeft = 3;
  movesLeftText.textContent = ("3 Moves");
}

function cardClick() { // have been struggling to make this function work well..
  if (event.target.className == "card") { // only escalate event when card is untouched
    event.target.className = "card open show";
    cardsOpen += 1;
    if (cardsOpen == 2) { // if 2 cards are open, check for match
      checkMatch();
      cardsOpen = 0;
    }
  }
}


function checkMatch() {
  const cardsToCheck = document.querySelectorAll('.open'); // collecting open cards in a nodeList
  const cardOne = cardsToCheck[0]; // saving card 1 for manipulating card status
  const cardTwo = cardsToCheck[1]; // saving card 2 for manipulating card status
  const cardOneChilds = cardOne.childNodes; // saving card 1 childs in a nodeList for checking match
  const cardTwoChilds = cardTwo.childNodes; // saving card 2 childs in a nodeList for checking match
  if (cardOneChilds[0].className == cardTwoChilds[0].className) { // if match
    cardOne.className = cardTwo.className = "card highlight";
    setTimeout(function() { cardOne.className = cardTwo.className = "card match"; }, 500); // temporarily keeps the card in a highlight position before going to a match position
    setTimeout(checkForWin, 1000);
  }
  else {
    cardOne.className = cardTwo.className = "card nomatch"; // if no match
    setTimeout(function() { cardOne.className = cardTwo.className = "card"; }, 1000); // temporarily keeps the card in a no match position before hiding the card again
    setTimeout(nextTurn, 1000);
  }
}

function nextTurn() {
  movesLeft -= 1;
  const allScoreCardStars = document.querySelectorAll('.fa-star');
  allScoreCardStars[movesLeft].className = "fa fa-star-o";
  if (movesLeft == 2) {
    movesLeftText.textContent = "2 Moves";
  }
  else if (movesLeft == 1) {
    movesLeftText.textContent = "1 Move";
  }
  else if (movesLeft == 0) {
    movesLeftText.textContent = "0 Moves";
    setTimeout(gameOver, 0);
  }
}

function gameOver() {
  alert("Sorry, game over! Continue to try again");
  restartGame();
}

function checkForWin() {
  const cardsMatched = document.querySelectorAll('.match');
  if (cardsMatched.length == 16) {
    alert("Yeah! You win! You had "+movesLeftText.textContent+" left.");
    restartGame();
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
