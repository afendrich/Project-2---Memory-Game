/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];
const cardsContainer = document.querySelector('.deck');
//Display the cards on the page
function generateCard(card) {
 return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}
function initGame() {
    let deck = document.querySelector('.deck');
    let moveCounter = document.querySelector('.moves');
    let cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });
    moves = 0;
    deck.innerHTML = cardHTML.join('');
}
let moves = 0;
let moveCounter = document.querySelector('.moves');
initGame();
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//event handler for clicking on card and determining if a match
const allCards = document.querySelectorAll('.card');
let openCards = [];
let matchedCards = [];
let isFirstClick = true;
const movesContainer = document.querySelector('.moves');
allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
        //timer
        if(isFirstClick) {
            // Start  timer
            startTimer();
            // Change First Click indicator's value
            isFirstClick = false;
        }
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
            card.classList.add('open', 'show');
            if (openCards.length == 2) {
                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards[0].classList.add('match');
                    matchedCards.push(openCards[0]);
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');
                    openCards[1].classList.add('match');
                    matchedCards.push(openCards[1]);
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');
                    openCards = [];
                } else {
                    //if no match, remove OPEN/SHOW
                    setTimeout(function () {
                        openCards.forEach(function(card) {
                            card.classList.remove('open', 'show');
                        });
                        openCards = [];
                    }, 500);
                }
                moves ++;
                moveCounter.innerHTML = moves;
                starRating();
                //check if the game is over
                isOver();
            };
        };
    });
});
//variable for star & star li
const stars = document.querySelectorAll('.fa-star');
let starsList = document.querySelectorAll('.stars li');
//event listener for reset button Clears Moves/Stars/Shuffles Deck
const restartButton = document.querySelector('.restart')
restartButton.addEventListener('click', function() {
    // Delete ALL cards
    cardsContainer.innerHTML = "";
    //initialize game, create new cards
    initGame();
    //reset the Game
    reset();
})
function reset() {
    location.reload();
}
function isOver() {
    if (matchedCards.length === 16) {
        //stop timer
        stopTimer();
        setTimeout(function () {
              showModal();
        }, 50);
    }
}
//rating of Game
const starsContainer = document.querySelector('.stars');
const star = `<li><i class="fa fa-star"></i></li>`;
const blankStar = `<li><i class="fa fa-star-o"></i></li>`;
starsContainer.innerHTML = star + star + star;
function starRating() {
    if (moves < 11) {
        starsContainer.innerHTML = star + star + star;
    } else if (moves < 15) {
        starsContainer.innerHTML = star + star + blankStar;
    } else {
        starsContainer.innerHTML = star + blankStar + blankStar;
    }
}
//Timer
const timerContainer = document.querySelector(".timer");
let liveTimer = 0;
let totalSeconds = 0;
// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds;
 function startTimer() {
    liveTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with the new time
        timerContainer.innerHTML = totalSeconds;
    }, 1000);
}
function stopTimer() {
    clearInterval(liveTimer);
}
//attempt to get modal working
let starsModalContainer = document.querySelector('.starsModal');
const star2 = `<ui><i class="fa fa-star"></i></ui>`;
const blankStar2 = `<ui><i class="fa fa-star-o"></i></ui>`;
function showModal() {
    document.getElementsByClassName('modal')[0].style.display = 'block';
    document.getElementById('moves').innerHTML = moves;
    document.getElementById('time').innerHTML = totalSeconds;
    if (moves < 11) {
        starsModalContainer.innerHTML = star2 + star2 + star2;
    } else if (moves < 15) {
        starsModalContainer.innerHTML = star2 + star2 + blankStar2;
    } else {
        starsModalContainer.innerHTML = star2 + blankStar2 + blankStar2;
    }
}
function hideModal() {
    document.getElementsByClassName('modal')[0].style.display = 'none';
}
let playAgain = document.getElementById('playAgain');
playAgain.addEventListener('click', function(){
    hideModal();
    reset();
})
//when user clicks outside of modal it closes
var modal = document.getElementById('myModal');
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//close modal on clicking of // X
$('.close').click(function() {
    modal.style.display = "none";
})
