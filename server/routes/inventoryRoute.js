import express from 'express';
import { createInventory, getInventory, updateInventory, deleteInventory } from '../controllers/inventoryController.js'

const inventoryRoute = express.Router();

inventoryRoute.post('/inventory', createInventory);
inventoryRoute.get('/inventory', getInventory);
inventoryRoute.get('/inventory/:id', getInventory);
inventoryRoute.put('/inventory/:id', updateInventory);
inventoryRoute.delete('/inventory/:id', deleteInventory);


export default inventoryRoute