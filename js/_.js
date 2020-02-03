import {WarehouseGrid} from './WarehouseGrid.js';

window.onload = () => {

	// create a WarehouseGrid and append it to the page
	let warehouse = new WarehouseGrid(7, 7);
	document.querySelector('#warehouse').appendChild(warehouse.element);

	// add a test box
	for (let i = 0; i < 10; i++) {
		warehouse.addRandomBox(100, 2, 4);
	}
}
