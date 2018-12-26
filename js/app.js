// Declare and initialize variables with global scope
let cardsToCompare = [];
let moves = 0;
let noMatches = 0;
let stars = 5;
let seconds = 0;
let minutes = 0;
let t;
let timerText = document.querySelector('.time');
const allCards = ['diamond','diamond','paper-plane-o','paper-plane-o','bolt','bolt','cube','cube','anchor','anchor','leaf','leaf','bicycle','bicycle','bomb','bomb'];

// Add event listeners for immutable elements
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restartGame);
const deckLocation = document.querySelector('ul.deck');
deckLocation.addEventListener('click', cardClick);
restartGame();

// Restart the game by resetting all relevant game variables.
function restartGame() {
  cardsToCompare = [];
  moves = 0;
  noMatches = 0;
  stars = 5;
  seconds = 0;
  minutes = 0;
  shuffleDeck();
  displayScore();
}
/*
- Create HTML elements and sub (child) elements for each card in the array and add to fragment
- Assign the appropriate classes and event listeners
- Replace current HTML .deck elements with newly generated fragment
*/
function shuffleDeck() {
  const newDeckOrder = shuffleArray(allCards);
  const fragment = document.createDocumentFragment();
  for(let i = 0; i < allCards.length; i++) {
    const newElement = document.createElement('li');
    newElement.className = 'card';
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
function displayScore() {
  const movesText = (moves == 1) ? ' Move ' : ' Moves';
  const movesLeftText = document.querySelector('.moves');
  movesLeftText.textContent = moves + movesText;
  switch(noMatches) {
  case 4:
    stars = 4;
    break;
  case 6:
    stars = 3;
    break;
  case 8:
    stars = 2;
    break;
  case 10:
    stars = 1;
    break;
  case 12:
    stars = 0;
    break;
  }
  const allStars = document.querySelectorAll('.star');
  allStars.forEach( function(star) { star.className = 'star fa fa-star-o';});
  for (let i = 0; i < stars; i++) {
    allStars[i].className = 'star fa fa-star';
  }
}
// Responds to user input when clicked on a card on the deck
function cardClick(event) {
  let card = event.target;
  if (card.className == 'card') { // only escalate event when it's an untouched card
    card.className = 'card open show';
    cardsToCompare.push(card);
    if (cardsToCompare.length == 2) { // if 2 cards are open, check for match
      checkMatch();
      cardsToCompare = [];
      moves += 1;
      displayScore();
    }
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
    setTimeout(function() { checkForWin(); }, 1000); // waits for classname to be updated and checks for win
  } else { // if no match
    cardOne.className = cardTwo.className = 'card nomatch';
    setTimeout(function() { cardOne.className = cardTwo.className = 'card'; }, 1000); // temporarily keeps the card in a no match position before hiding the card again
    noMatches += 1;
  }
}
// Checks if all cards are matched
function checkForWin() {
  const cardsMatched = document.querySelectorAll('.match');
  if (cardsMatched.length == 16) {
    clearTimeout(t);
    alert('Yeah! You win! Your score: ' + moves + ' moves, ' + stars + ' and a time of ' + timerText.textContent + '. Want to start again and try to improve your score?');
    restartGame();
  }
}

// shows timer on screen
function showTimer() {
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  timerText.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
  timer();
  seconds++;
}

// updates showTimer every second
function timer() {
  t = setTimeout(showTimer, 1000);
}
timer();

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
