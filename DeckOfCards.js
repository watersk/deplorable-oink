/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */


function Card(number, suit, value) { // each Card has a number, suit, and value
    "use strict";
    this.number = number;
    this.suit = suit;
    this.value = value;
}

function initDeck() { // initialize the deck - 52 cards, 4 suits, A-K and push into a single array -> values also are assigned in this function (except for A because of gameplay calculation stuff)
    "use strict";
    var x, i, j;

    var Suit = ["Hearts", "Diamonds", "Clubs", "Spades"];
    var Number = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    var Deck = new Array(0);

    for (i = 0; i < Number.length; (i++)) {
        for (j = 0; j < Suit.length; (j++)) {
            Deck.push(new Card(Number[i], Suit[j]));
        }
    }

    for (x = 0; x < Deck.length; x++) {
        if (Deck[x].number === "J" || Deck[x].number === "Q" || Deck[x].number === "K") {
            Deck[x].value = 10;
        } else {
            Deck[x].value = parseInt(Deck[x].number, 10);
        }
    }

    return Deck;

}

function deckShuffle(deck) { // randomly shuffles the deck
    "use strict";
    var x, temp;
    var length = deck.length - 1;
    var randNum;
    for (x = length; x > 0; x--) {
        randNum = Math.floor((Math.random() * x));
        temp = deck[x];
        deck[x] = deck[randNum];
        deck[randNum] = temp;
    }

    console.log(deck);
    return deck;
}

function Player(hand, score) { // player has a hand and score (for blackjack)
    "use strict";
    this.hand = hand;
    this.score = score;
}

function dealHand(deck, players) { // deals out two cards to each player
    "use strict";
    var i, j;

    for (i = 0; i < 4; i++) {
        if (i >= players.length) {
            j = i % 2;
            players[j].hand.push(deck.shift()); // remove the card from the deck so it can't be given to another player
        } else {
            players[i].hand.push(deck.shift());
        }
    }

    return players;
}

function handCheck(hand) { // checks the hand to make sure the correct cards went to the correct players
    "use strict";
    var i;

    for (i = 0; i < hand.length; i++) {
        console.log("Card " + (i + 1) + " is the " + hand[i].number + " of " + hand[i].suit);
    }
}

function getPoints(hand, prevScore) { // calculates points of a user's hand (blackjack)
    "use strict";
    var num = 21;
    var i;

    for (i = 0; i < hand.length; i++) {
        if (hand[i].number === "A") {
            if (prevScore + 11 > 21) {
                hand[i].value = 1;
            } else {
                hand[i].value = 11;
            }
        }
        prevScore = prevScore + hand[i].value;
    }

    return prevScore;
}

var gameDeck = deckShuffle(initDeck()); // create the deck for the game

var dealerHand = new Array(0); // initialize the dealer and player hands
var playerHand = new Array(0);

var dealer = new Player(dealerHand, 0); // create new players with 0 score
var player = new Player(playerHand, 0);

var players = new Array(0); // create an array to contain 2 players
players.push(dealer);
players.push(player);

dealHand(gameDeck, players); // deal out the cards

console.log("Dealer's hand: ");
handCheck(dealerHand);
console.log("Player's hand: ");
handCheck(playerHand);

console.log("Dealer has " + getPoints(dealerHand, dealer.score) + " points.");
console.log("Player has " + getPoints(playerHand, player.score) + " points.");


console.log(gameDeck); // makes sure the corect cards were removed and the order of the remaining cards equal the original gameDeck (before dealing)
