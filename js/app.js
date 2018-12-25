// Declare and initialize variables with global scope
let cardsToCompare = [];
let movesLeft = 4;
let movesLeftText = '';
const allCards = ['diamond','diamond','paper-plane-o','paper-plane-o','bolt','bolt','cube','cube','anchor','anchor','leaf','leaf','bicycle','bicycle','bomb','bomb'];

// Add event listeners for immutable elements
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restartGame);

restartGame();

// Restart the game by resetting all relevant game variables.
function restartGame() {
  cardsToCompare = [];
  movesLeft = 4;
  shuffleDeck();
  displayMoves();
}
/*
- Create HTML elements and sub (child) elements for each card in the array and add to fragment
- Assign the appropriate classes and event listeners
- Replace current HTML .deck elements with newly generated fragment
*/
function shuffleDeck() {
  const newDeckOrder = shuffleArray(allCards);
  const deckLocation = document.querySelector('ul.deck');
  const fragment = document.createDocumentFragment();
  for(let i = 0; i < allCards.length; i++) {
    const newElement = document.createElement('li');
    newElement.className = 'card';
    newElement.addEventListener('click', cardClick);
    const newSubElement = document.createElement('i');
    newSubElement.className = 'fa fa-' + newDeckOrder[i];
    newElement.appendChild(newSubElement);
    fragment.appendChild(newElement);
  }
  while (deckLocation.firstChild) { // remove current card deck (if applicable)
    deckLocation.removeChild(deckLocation.firstChild);
  }
  deckLocation.appendChild(fragment); // reflow and repaint
}

// shuffle the values in the card array
function shuffleArray(array) { // shuffle the list of cards using a custom shuffle function
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// Manages the scoreboard by updating the stars and the moves text
function displayMoves() {
  const movesText = (movesLeft == 1) ? ' Move' : ' Moves';
  movesLeftText = document.querySelector('.moves');
  movesLeftText.textContent = movesLeft + movesText;
  const allStars = document.querySelectorAll('.star');
  allStars.forEach( function(star) { star.className = 'star fa fa-star-o';});
  for (let i = 0; i < movesLeft; i++) {
    allStars[i].className = 'star fa fa-star';
  }
}
// Responds to user input when clicked on a card on the deck
function cardClick(event) {
  let card = event.target;
  if (card.className == 'card') { // only escalate event when card is untouched
    card.className = 'card open show';
    cardsToCompare.push(card);
  }
  if (cardsToCompare.length == 2) { // if 2 cards are open, check for match
    checkMatch();
    cardsToCompare = [];
  }
}
// Checks if there is a match
function checkMatch() {
  const cardOne = cardsToCompare[0];
  const cardTwo = cardsToCompare[1];
  const cardOneSymbol = cardOne.childNodes[0];
  const cardTwoSymbol = cardTwo.childNodes[0];
  if (cardOneSymbol.className == cardTwoSymbol.className) { // if match
    cardOne.className = 'card highlight';
    cardTwo.className = 'card highlight';
    setTimeout(function() { cardOne.className = cardTwo.className = 'card match'; }, 1000); // temporarily keeps the card in a highlight position before going to a match position
    checkForWin();
  } else { // if no match
    cardOne.className = cardTwo.className = 'card nomatch';
    setTimeout(function() { cardOne.className = cardTwo.className = 'card'; }, 1000); // temporarily keeps the card in a no match position before hiding the card again
    nextTurn();
  }
}
// Decrease available moves by 1 and take action if no moves are left
function nextTurn() {
  movesLeft -= 1;
  displayMoves();
  if (movesLeft == 0) {
    gameOver();
  }
}
// Informs the player that the game is over
function gameOver() {
  alert('Sorry, game over! Continue to try again');
  restartGame();
}
// Checks if all cards are matched
function checkForWin() {
  const cardsMatched = document.querySelectorAll('.match');
  if (cardsMatched.length == 16) {
    alert('Yeah! You win! You had '+movesLeftText.textContent+' left.');
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
