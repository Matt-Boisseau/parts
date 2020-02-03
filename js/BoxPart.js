export class BoxPart {

	constructor(facing, length, hardware) {

		// parameters
		this.facing = facing;
		this.length = length;
		this.hardware = hardware;

		this.connectedParts = null;

		// DOM element
		this.element = (() => {
			let element = document.createElement('div');
			element.classList.add('box-part');
			element.classList.add('facing-' + this.directionName(facing));
			let textElement = document.createElement('span');
			textElement.innerHTML = this.hardware.part;
			element.appendChild(textElement);
			return element;
		})();
	}

	// cardinal direction constants
	static directions = {
		NONE: { dx: 0, dy: 0 },
		NORTH: { dx: 0, dy: -1 },
		EAST: { dx: 1, dy: 0 },
		SOUTH: { dx: 0, dy: 1 },
		WEST: { dx: -1, dy: 0 }
	};

	static oppositeDirection(direction) {
		switch (direction) {
			case BoxPart.directions.NORTH: return BoxPart.directions.SOUTH;
			case BoxPart.directions.EAST: return BoxPart.directions.WEST;
			case BoxPart.directions.SOUTH: return BoxPart.directions.NORTH;
			case BoxPart.directions.WEST: return BoxPart.directions.EAST;
			default: return 'none';
		}
	}

	directionName(direction) {
		switch (direction) {
			case BoxPart.directions.NORTH: return 'north';
			case BoxPart.directions.EAST: return 'east';
			case BoxPart.directions.SOUTH: return 'south';
			case BoxPart.directions.WEST: return 'west';
			default: return 'none';
		}
	}
}
