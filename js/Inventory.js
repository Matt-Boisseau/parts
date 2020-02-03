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

		// discard and draw
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

		// update hand elements
		let handElement = document.querySelector('#hand>div');
		while (handElement.firstChild) {
			handElement.removeChild(handElement.firstChild);
		}
		this.hand.forEach(card => {
			let cardElement = document.createElement('div');
			cardElement.classList.add('box-part', 'card', 'part-' + card.replace(/\s+/g, '-')); // card name has spaces replaced with hyphens
			let cardText = document.createElement('span');
			cardText.innerHTML = card;
			cardElement.appendChild(cardText);
			handElement.appendChild(cardElement);
		});

		// update pile elements
		let deckPileElement = document.querySelector('#deck');
		while (deckPileElement.firstChild) {
			deckPileElement.removeChild(deckPileElement.firstChild);
		}
		this.deck.forEach(card => {
			let cardElement = document.createElement('div');
			cardElement.classList.add('box-part', 'card', 'part-' + card.replace(/\s+/g, '-')); // card name has spaces replaced with hyphens
			let cardText = document.createElement('span');
			cardText.innerHTML = card;
			cardElement.appendChild(cardText);
			deckPileElement.appendChild(cardElement);
		});

		// update discard elements
		let discardPileElement = document.querySelector('#discard');
		while (discardPileElement.firstChild) {
			discardPileElement.removeChild(discardPileElement.firstChild);
		}
		this.discard.forEach(card => {
			let cardElement = document.createElement('div');
			cardElement.classList.add('box-part', 'card', 'part-' + card.replace(/\s+/g, '-')); // card name has spaces replaced with hyphens
			let cardText = document.createElement('span');
			cardText.innerHTML = card;
			cardElement.appendChild(cardText);
			discardPileElement.appendChild(cardElement);
		});

		console.log(this.deck);
		console.log(this.hand);
		console.log(this.discard);
	}

	shuffle() {
		this.deck = this.deck.concat(this.discard);
		this.discard = [];
	}
}
