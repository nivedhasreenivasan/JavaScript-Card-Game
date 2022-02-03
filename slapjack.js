// A list of codes for the images and unified nomenclature
const mainDeck = ['AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 'KS',
    'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'JD', 'QD', 'KD',
    'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'JC', 'QC', 'KC',
    'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH'];
// ^^ will be used as "cards" because the codes line up with the image file names (e.g. AS -> AS.png)\
var start = false;

function shuffle() {
    let current_index = mainDeck.length, rIndex;

    while (current_index != 0) {
        rIndex = Math.floor(Math.random() * mainDeck.length);
        current_index--;

        [mainDeck[current_index], mainDeck[rIndex]] = [mainDeck[rIndex], mainDeck[current_index]];
    }
}

var stack = {
    currCard: '',
    deck: []
}
// I dont know whether to have an [] of players or just keep the number of players static and named
var players = [];
var numP = 4;

//called at the biggining of the game
function setup(numPLayers) {
    shuffle();
    numP = numPLayers;
    for (let i = 0; i < numPLayers; i++) {
        //splits the deck into equal sections
        let split = (52 / numPLayers)
        players[i] = {
            cards: mainDeck.slice(split * i, split * (i + 1))
        }
    }

    start = true;
}

function compCycle() {
    for(let i = 1; i < numP; i++) {
        computerPlay(i);
    }
}

//more of a template than anything concrete as per ^^
function slap(index) {
    if (stack.currCard.charAt(0) == 'J') {
        // adds the stack to the player's card pile
        console.log(players[index].cards.length);
        players[index].cards.splice(0, 0, stack.deck);
        console.log(players[index].cards.length);
        stack.deck = [];
        stack.currCard = '';
    } else {
        // adds the current player's top card to the next player's hand
        players[(index + 1) % numP].cards.splice(0, 0, players[index].cards.pop());
    }
}

function placeCard(index) {
    if(index === 0) {
        for(let i = 0; i < numP; i++) {
            console.log(players[i].cards.length);
        }
    }
    if (players[index].cards.length == 0) {
        // TODO -> Lose 
        return;
    }

    stack.deck.push(players[index].cards.pop());
    stack.currCard = stack.deck[stack.deck.length - 1];
    updatePile();
    if (stack.currCard.charAt(0) == 'J') {
        computerSlap();
    } else {
        // 1 / 16th chance a computer will slap randomly
        if (Math.random() < 0.125) {
            computerSlap();
        }
    }
}

//delay them playing
function computerPlay(index) {
    let time = Math.floor(Math.random() * 500) + (500 * index);
    setTimeout(() => {
        placeCard(index);
    }, time);
}

function computerSlap() {
    let times = Array.from({ length: players.length }, _ => Math.floor(Math.random * 500 + 500));
    let index = 1;
    let timeout = 2750;
    for (let i = 0; i < times.length; i++) {
        if (times[i] < timeout) {
            index = i;
            timeout = times[i];
        }
    }
    setTimeout(() => {
        slap(index);
    }, timeout);
}


function updatePile() {
    if(stack.currCard == "" ) {
        document.getElementById("played").src="images/back-black.png";
    } else {
        document.getElementById("played").src=`images/${stack.currCard}.png`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setup(4);
    document.getElementById('screen').addEventListener('click', () => {
        placeCard(0);
        compCycle();
    });

    document.addEventListener('keyup', event => {
        if (start && event.code === 'Space') {
            slap(0);
        }
    });
});