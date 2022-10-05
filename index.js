let player = {
    name: "Your chips",
    chips: 100
}
function renderChips(){
    playerEl.textContent = player.name + ": $" + player.chips
}
function renderDealerCards() {
    dealerEl.textContent = "Dealer cards: "
     for (let i = 0; i < dealerCards.length; i++){
        dealerEl.textContent += dealerCards[i] + " "
     }
     return dealerEl.textContent
}

let cards = []
let dealerCards = []
let sum = 0
let dealerSum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let dealerEl = document.getElementById("dealer-el")

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

//pre-renderGame() state
function startGame() {
    if(player.chips > 0){
        isAlive = true
        hasBlackJack = false

        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        let firstDealer = getRandomCard()
        let secondDealer = getRandomCard()

        cards = [firstCard, secondCard]
        dealerCards = [firstDealer, secondDealer]
        sum = firstCard + secondCard
        dealerSum = firstDealer + secondDealer
        player.chips = player.chips - 10
        renderGame()    
    } 
    //checking if player has money to start a game
    else if (player.chips <= 0){
        message = "You have no money!"
        messageEl.textContent = message
    }
}

//whole game mechanics
function renderGame() {
    
    cardsEl.textContent = "Your cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    if(dealerCards.length == 2){
        dealerEl.textContent = "Dealer cards: " + dealerCards[0] + " X"
    }
    else if(dealerCards.length > 2){
        dealerEl.textContent = "Dealer cards: " + dealerCards[0] + " " + dealerCards[1] + " X"
    }
    else if(dealerCards.length > 3){
        dealerEl.textContent = "Dealer cards: " + dealerCards[0] + " " + dealerCards[1] + "" + dealerCards[2] + " X"
    }
    renderChips()
 
    sumEl.textContent = "Sum: " + sum
    if (dealerSum > 21){
        message = "You win, dealer busts"
        renderDealerCards()
        player.chips += 20
        renderChips()
    }
    else if(dealerSum === 21){
            message = "Dealer has a blackjack. You lose."
            renderDealerCards()
            isAlive = false
        
    }
    if(sum <= 20) {
        message = "Do you want to draw a new card?"
    } 
    else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        player.chips += 20
        renderDealerCards()
        renderChips()
    } else {
        message = "You're out of the game!"
        isAlive = false
        renderDealerCards()
    }
    messageEl.textContent = message
}

//drawing a new card for player and for dealer
function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        if (dealerSum <= 16) {
            let card = getRandomCard()
            dealerSum += card
            dealerCards.push(card)
        }

        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

//summing game after hitting stay and deciding the result
function sumGame(){
    if(isAlive===true){

    if (sum < dealerSum){
            message = "Dealer win " + sum + ":" + dealerSum 
            renderDealerCards()
            isAlive = false 
        }
        else if (sum === dealerSum){
            message = "Draw " + sum + ":" + dealerSum
            player.chips += 10
            renderDealerCards()
            renderChips()
        }
        else if(sum > dealerSum){
            message = "You win " + sum + ":" + dealerSum
            player.chips += 20
            renderDealerCards()
            renderChips()
        }
        messageEl.textContent = message
    }
}