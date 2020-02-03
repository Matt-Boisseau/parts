import { WarehouseGrid } from './WarehouseGrid.js';
import { Inventory } from './Inventory.js';

window.onload = () => {

	// create an Inventory
	let inventory = new Inventory(5);

	// create a WarehouseGrid and append it to the page
	let warehouse = new WarehouseGrid(7, 7, inventory);
	document.querySelector('#warehouse').appendChild(warehouse.element);

	// restock button event listener
	document.querySelector('#restock-button').addEventListener('click', () => {
		inventory.draw();
		//TODO: restock warehouse, too
	});

	// add test boxes
	for (let i = 0; i < 10; i++) {
		warehouse.addRandomBox(100, 2, 4);
	}
}
