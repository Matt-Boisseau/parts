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
					rowElement.appendChild(cellElement);
					this.cells[row][col].element = cellElement;
				}
			}
			return warehouseElement;
		})();
	}

	addNewBox(x, y, facing, length) {

		let { dx, dy } = (() => {
			switch (facing) {
				case BoxPart.directions.NORTH: return { dx: 0, dy: -1 };
				case BoxPart.directions.EAST: return { dx: 1, dy: 0 };
				case BoxPart.directions.SOUTH: return { dx: 0, dy: 1 };
				case BoxPart.directions.WEST: return { dx: -1, dy: 0 };
				default: return { dx: 0, dy: 0 };
			}
		})();

		for(let i = 0; i < length; i++) {

			let cell = this.cells[y + (dy * i)][x + (dx * i)];

			let partFacing = (() => {
				switch (i) {
					case 0: return (facing + 2) % 4; // opposite direction for back of the line
					case (length - 1): return facing; // inputted direction for front of the line
					default: return BoxPart.directions.NONE; // no direction for the middle guys
				}
			})();
			console.log(partFacing);

			cell.boxPart = new BoxPart(partFacing, null);
			cell.element.appendChild(cell.boxPart.element);
		}
	}
}
