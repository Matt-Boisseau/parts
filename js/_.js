import { WarehouseGrid } from './WarehouseGrid.js';
import { Inventory } from './Inventory.js';

window.onload = () => {

	// create an Inventory and draw
	let inventory = new Inventory(5);
	inventory.draw();

	// create a WarehouseGrid and append it to the page
	let warehouse = new WarehouseGrid(7, 7, inventory);
	document.querySelector('#warehouse').appendChild(warehouse.element);

	// add starting boxes
	for (let i = 0; i < 10; i++) {
		warehouse.addRandomBox(100, 2, 4);
	}

	// restock button event listener
	document.querySelector('#restock-button').addEventListener('click', () => {
		inventory.draw();
		warehouse.addRandomBox(100, 2, 4);
	});
}
