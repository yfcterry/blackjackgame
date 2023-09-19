/* scenario 
under 21
at 21
over 21 */

let cards = []
let dealerCards = []
let sum = 0;
let dealerSum =0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById('message-el');
let sumEl = document.querySelector('#sum-el');
let sumEl2 = document.querySelector('#sum-el2');
let cardsEl = document.getElementById('cards-el');
let dealerCardsEl = document.getElementById('dealer-cards-el');
let noteEl = document.getElementById('note-el');
let playerEl = document.getElementById('player-el');

let player = {
    name: "Player One",
    chips: 500
}
playerEl.textContent = player.name + ": $ " + player.chips;

function getRandomCard() {
    let randomNumber = Math.floor( Math.random() * 13 ) + 1;
    if(randomNumber > 10) {
        return 10;
    } else if (randomNumber ===1) {
        return 11;
    } else {
        return randomNumber;
    }
}
function getRandomCardDealer() {
    let randomNumber = Math.floor( Math.random() * 13 ) + 1;
    if(randomNumber > 10) {
        return 10;
    } else if (randomNumber ===1) {
        return 11;
    } else {
        return randomNumber;
    }
}
function startGame() {
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
    dealerCard();
}
function dealerCard() {
    let dealerFirstCard = getRandomCardDealer();
    let dealerSecondCard = getRandomCardDealer();
    dealerCards = [dealerFirstCard, dealerSecondCard];
    dealerSum = dealerFirstCard + dealerSecondCard;
    if(dealerSum <=16) {
        let dealerThirdCard = getRandomCardDealer();
        dealerSum += dealerThirdCard;
        dealerCards.push(dealerThirdCard);
        if(dealerSum <=16) {
            let dealerFourthCard = getRandomCardDealer();
            dealerSum += dealerFourthCard;
            dealerCards.push(dealerFourthCard);
            if(dealerSum <=16) {
                let dealerFifthCard = getRandomCardDealer();
                dealerSum += dealerFifthCard;
                dealerCards.push(dealerFifthCard);
            }
        }
    }
    dealerCardsEl.textContent = "Dealer Cards: ";
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " ";
    }
    sumEl2.innerHTML = "Dealer Total: " + dealerSum;
    compareCard()
}
function compareCard() {
    if(sum === 21 && dealerSum === 21) {
        noteEl.innerHTML = "It a tie"
    } else if (sum > 21 && dealerSum <= 21) {
        noteEl.innerHTML = "you Lose"
        player.chips--;
    } else if (sum <= 21 && dealerSum > 21) {
        noteEl.innerHTML = "you Win"
        player.chips++;
    } else if (sum > dealerSum) {
        noteEl.innerHTML = "you Win"
        player.chips++;
    } else if (sum < dealerSum) {
        noteEl.innerHTML = "you lose"
        player.chips--;
    }
    
}
function renderGame() {
    cardsEl.textContent = "Your Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
    sumEl.innerHTML = "Your Total: " + sum;
    if(sum < 21) {
        message = 'do you want to draw a new card?';    
    } else if (sum === 21) {
        message = "you've got Blackjack!";
        hasBlackJack = true;
    } else {
        message = "you're out of the game!";
        isAlive = false;
    }
    messageEl.innerHTML = message;
    
}
function newCard() {
    if (isAlive === true && hasBlackJack === false) {
    let newCard = getRandomCard();
    sum = sum + newCard;
    cards.push(newCard);
    renderGame();
    compareCard();
} else {
    noteEl.innerHTML = "You can not add card now, either you have not start the game or you are busted!"
}
compareCard()
}

