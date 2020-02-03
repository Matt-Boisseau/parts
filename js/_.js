import {WarehouseGrid} from './WarehouseGrid.js';
import {BoxPart} from './BoxPart.js';

window.onload = () => {

	// create a WarehouseGrid and append it to the page
	let warehouse = new WarehouseGrid(5, 7);
	document.querySelector('#warehouse').appendChild(warehouse.element);

	// add a test box
	warehouse.addNewBox(2, 1, BoxPart.directions.EAST, 3);
}
