import { Hardware } from './Hardware.js';
import { wait } from './SynchronousWait.js';

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
		this.busy = false;
	}

	addNewCard(hardware) {
		this.discard.push(hardware);
		this.updateAllElements();
	}

	async draw() {

		// discard the hand
		this.discard = this.discard.concat(this.hand);
		this.hand = [];
		await this.updateAllElements();

		// draw
		for (let i = 0; i < this.handSize; i++) {

			// shuffle if there's nothing in the draw pile
			if (this.deck.length == 0) {
				await this.shuffle();
			}

			// abort if there are still no cards to draw (the entire deck is in the hand)
			if (this.deck.length == 0) {
				break;
			}

			// draw a random card (removing it from the deck)
			this.hand[i] = this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)[0];
		}

		this.updateAllElements();
	}

	async shuffle() {
		this.deck = this.deck.concat(this.discard);
		this.discard = [];
		await this.updateAllElements();
	}

	async updateAllElements() {
		this.deck.sort();
		this.discard.sort();
		this.updateElement('#hand>div', this.hand, this.handSize);
		this.updateElement('#deck>div', this.deck);
		this.updateElement('#discard>div', this.discard);
		await wait(500);
	}

	updateElement(query, cards, minimum) {

		let element = document.querySelector(query);

		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}

		cards.forEach(card => {
			let cardElement = document.createElement('div');
			cardElement.classList.add('box-part', 'card', 'part-' + card.replace(/\s+/g, '-')); // card name has spaces replaced with hyphens
			let cardText = document.createElement('span');
			cardText.innerHTML = card;
			cardElement.appendChild(cardText);
			element.appendChild(cardElement);
		});

		if (cards.length < minimum) {
			for (let i = 0; i < minimum - cards.length; i++) {
				let cardElement = document.createElement('div');
				cardElement.classList.add('box-part', 'card', 'spacer');
				element.appendChild(cardElement);
			}
		}
	}
}
