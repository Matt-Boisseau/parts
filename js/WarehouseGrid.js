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

		let { dx, dy } = facing;

		for(let i = 0; i < length; i++) {

			let cell = this.cells[y + (dy * i)][x + (dx * i)];

			let partFacing = (() => {
				switch (i) {
					case 0: return BoxPart.oppositeDirection(facing); // opposite direction for back of the line
					case (length - 1): return facing; // inputted direction for front of the line
					default: return BoxPart.directions.NONE; // no direction for the middle guys
				}
			})();

			cell.boxPart = new BoxPart(partFacing, null, this);
			cell.element.appendChild(cell.boxPart.element);
		}
	}

	moveBox(x, y) {

		let clickedCell = this.cells[y][x];

		if (clickedCell.boxPart != null) {

			let { dx, dy } = clickedCell.boxPart.facing;

			// note that we only have to check the leading boxParts for clearance--connected boxParts will can always move if the lead can move
			if (x + dx < 0 || x + dx >= this.width || y + dy < 0 || y + dy >= this.height) {
				// moving off the board - delete these boxes
				clickedCell.element.removeChild(clickedCell.boxPart.element);
				clickedCell.boxPart = null;
			}

			// if not leaving the board:
			else {

				let targetCell = this.cells[y + dy][x + dx];

				// give up if there's another box in the way
				if (targetCell.boxPart != null) {
					return;
				}
	
				targetCell.boxPart = clickedCell.boxPart;
				targetCell.element.appendChild(clickedCell.boxPart.element);
	
				clickedCell.boxPart = null;
			}
		}
	}
}
