export class BoxPart {

	constructor(facing, connectedParts) {

		// parameters
		this.facing = facing;
		this.connectedParts = connectedParts;

		// DOM element
		this.element = (() => {
			let element = document.createElement('div');
			element.classList.add('box-part');
			element.classList.add('facing' + facing);
			return element;
		})();
	}

	// cardinal directions enum
	static directions = { NONE: -1, NORTH: 0, EAST: 1, SOUTH: 2, WEST: 3 };

	static directionToVector(direction) {
		switch (direction) {
			case BoxPart.directions.NORTH: return { dx: 0, dy: -1 };
			case BoxPart.directions.EAST: return { dx: 1, dy: 0 };
			case BoxPart.directions.SOUTH: return { dx: 0, dy: 1 };
			case BoxPart.directions.WEST: return { dx: -1, dy: 0 };
			default: return { dx: 0, dy: 0 };
		}
	}
}
