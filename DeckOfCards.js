/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */

function Card(number, suit, value) {
    "use strict";
    this.number = number;
    this.suit = suit;
    this.value = value;
}

function initDeck() {
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

    //console.log(Deck.length);
    //console.log(Deck);

    return Deck;

}

function deckShuffle(deck) {
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

function Player(hand, score) {
    "use strict";
    this.hand = hand;
    this.score = score;
}

function dealHand(deck, players) {
    "use strict";
    var i, j;

    for (i = 0; i < 4; i++) {
        if (i >= players.length) {
            j = i % 2;
            players[j].hand.push(deck.shift());
        } else {
            players[i].hand.push(deck.shift());
        }
    }

    return players;
}

function handCheck(hand) {
    "use strict";
    var i;

    for (i = 0; i < hand.length; i++) {
        console.log("Card " + (i + 1) + " is the " + hand[i].number + " of " + hand[i].suit);
    }
}

function getPoints(hand, prevScore) {
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

var gameDeck = deckShuffle(initDeck());

var dealerHand = new Array(0);
var playerHand = new Array(0);

var dealer = new Player(dealerHand, 0);
var player = new Player(playerHand, 0);

var players = new Array(0);
players.push(dealer);
players.push(player);

dealHand(gameDeck, players);

handCheck(dealerHand);
handCheck(playerHand);

console.log("Dealer has " + getPoints(dealerHand, dealer.score) + " points.");
console.log("Player has " + getPoints(playerHand, player.score) + " points.");


console.log(gameDeck);
