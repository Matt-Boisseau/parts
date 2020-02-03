import { Hardware } from './Hardware.js';

export class Inventory {

	constructor(handSize) {

		// parameters
		this.handSize = handSize;

		// defaults
		this.deck = [];
		for (let key in Hardware) {
			this.deck.push(Hardware[key].tool);
		}
		this.hand = [];
		this.discard = [];
	}

	addNewCard(hardware) {
		this.deck.push(hardware);
	}

	draw() {

		for (let i = 0; i < this.handSize; i++) {

			// discard any card in this slot
			if (this.hand[i] != null) {
				this.discard.push(this.hand[i]);
			}

			// shuffle if there's nothing in the draw pile
			if (this.deck.length == 0) {
				this.shuffle();
			}

			// abort if there are still no cards to draw (the entire deck is in the hand)
			if (this.deck.length == 0) {
				break;
			}

			// draw a random card (removing it from the deck)
			this.hand[i] = this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)[0];
		}

		console.log(this.deck);
		console.log(this.hand);
		console.log(this.discard);
	}

	shuffle() {
		this.deck = this.deck.concat(this.discard);
		this.discard = [];
	}
}
