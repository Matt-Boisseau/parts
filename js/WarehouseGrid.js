import {BoxPart} from './BoxPart.js';

export class WarehouseGrid {

	constructor(width, height) {

		// parameters
		this.width = width;
		this.height = height;

		// 2d cells array
		this.cells = (() => {
			let cells = [];
			for(let row = 0; row < this.height; row++) {
				cells[row] = [];
				for(let col = 0; col < this.width; col++) {
					cells[row][col] = {
						element: null,
						boxPart: null
					};
				}
			}
			return cells;
		})();

		// DOM element
		this.element = (() => {
			let warehouseElement = document.createElement('div');
			warehouseElement.classList.add('warehouse-grid')
			for(let row = 0; row < this.cells.length; row++) {
				let rowElement = document.createElement('div');
				rowElement.classList.add('warehouse-row')
				warehouseElement.appendChild(rowElement);
				for(let col = 0; col < this.cells[0].length; col++) {
					let cellElement = document.createElement('div');
					cellElement.classList.add('warehouse-cell');
					cellElement.addEventListener("click", () => { this.moveBox(col, row) });
					rowElement.appendChild(cellElement);
					this.cells[row][col].element = cellElement;
				}
			}
			return warehouseElement;
		})();
	}

	addNewBox(x, y, facing, length) {

		// early exit if any of the cells is already occupied OR if any of the cells is off the grid
		for (let i = 0; i < length; i++) {
			let target = { x: x + facing.dx * i, y: y + facing.dy * i };
			if (target.x < 0 || target.x >= this.width || target.y < 0 || target.y >= this.height) return false;
			if (this.cells[target.y][target.x].boxPart != null) return false;
		}

		for (let i = 0; i < length; i++) {

			let cell = this.cells[y + (facing.dy * i)][x + (facing.dx * i)];

			let partFacing = (() => {
				switch (i) {
					case 0: return BoxPart.oppositeDirection(facing); // opposite direction for back of the line
					case (length - 1): return facing; // inputted direction for front of the line
					default: return BoxPart.directions.NONE; // no direction for the middle guys
				}
			})();

			cell.boxPart = new BoxPart(partFacing, length);
			cell.element.appendChild(cell.boxPart.element);
		}

		// return true if everything worked
		return true;
	}

	addRandomBox(attempts, minLength, maxLength) {
		for (let i = 0; i < attempts; i++) {
			let length = minLength + Math.floor(Math.random() * (maxLength - minLength + 1));
			let x = Math.floor(Math.random() * this.width);
			let y = Math.floor(Math.random() * this.height);
			let facing = [BoxPart.directions.NORTH, BoxPart.directions.EAST, BoxPart.directions.SOUTH, BoxPart.directions.WEST][Math.floor(Math.random() * 4)];
			if (this.addNewBox(x, y, facing, length)) {
				return;
			}
		}
		console.log('unable to add random box after ' + attempts + ' attempts :(');
	}

	moveBox(x, y) {

		let clickedCell = this.cells[y][x];

		if (clickedCell.boxPart != null) {

			let { dx, dy } = clickedCell.boxPart.facing;

			// moving off the board (delete the boxParts)
			if (x + dx < 0 || x + dx >= this.width || y + dy < 0 || y + dy >= this.height) {
				let length = clickedCell.boxPart.length;
				for (let i = 0; i < length; i++) {
					let cell = this.cells[y - (dy * i)][x - (dx * i)];
					cell.element.removeChild(cell.boxPart.element);
					cell.boxPart = null;
				}
			}

			// moving within the board (move the boxParts)
			else {

				let targetCell = this.cells[y + dy][x + dx];

				// give up if there's another box in the way
				if (targetCell.boxPart != null) {
					return;
				}

				let length = clickedCell.boxPart.length;
				for (let i = 0; i < length; i++) {
					let cell = this.cells[y - (dy * i)][x - (dx * i)];
					let targetCell = this.cells[y - (dy * i) + dy][x - (dx * i) + dx]
					targetCell.boxPart = cell.boxPart;
					targetCell.element.appendChild(cell.boxPart.element);
					cell.boxPart = null;
				}
			}
		}
	}
}
