import {WarehouseGrid} from './WarehouseGrid.js';
import {BoxPart} from './BoxPart.js';

window.onload = () => {

	// create a WarehouseGrid and append it to the page
	let warehouse = new WarehouseGrid(5, 7);
	document.querySelector('#warehouse').appendChild(warehouse.element);

	// add a test box
	/*
	warehouse.addNewBox(2, 1, BoxPart.directions.EAST, 3);
	warehouse.addNewBox(3, 3, BoxPart.directions.SOUTH, 3);
	warehouse.addNewBox(4, 3, BoxPart.directions.WEST, 3);
	*/
	for (let i = 0; i < 10; i++) {
		warehouse.addRandomBox(100, 2, 4);
	}
}
