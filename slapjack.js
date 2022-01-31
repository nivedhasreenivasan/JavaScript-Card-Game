// A list of codes for the images and unified nomenclature
const deck = ['AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 
'KS', 'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'JD', 'QD', 'KD', 
'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'JC', 'QC', 'KC', 'AH', 
'2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH'];

function shuffle() {
    let current_index = deck.length, rIndex;

    while(current_index != 0) {
        rIndex = Math.floor(Math.random() * deck.length);
        current_index--;

        [deck[current_index], deck[rIndex]] = [deck[rIndex], deck[current_index]];
    }
}

shuffle();

var stack = {
    curr_card: '',
    deck: []
}

var player1 = {
    cards: []
}

var computer1 = {
    cards: []
}

function playerSlap() {
    if()
}