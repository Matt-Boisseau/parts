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
}
