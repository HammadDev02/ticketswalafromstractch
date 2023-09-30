import express from 'express';
import {createInventoryCat, getInventoryCat, deleteInventoryCat, updateInventoryCat} from '../controllers/inventoryCatController.js'

const inventoryCatRoute = express.Router();

inventoryCatRoute.post('/inventory/category', createInventoryCat);
inventoryCatRoute.get('/inventory/category', getInventoryCat);
inventoryCatRoute.get('/inventory/category/:id', getInventoryCat);
inventoryCatRoute.put('/inventory/category/:id', updateInventoryCat);
inventoryCatRoute.delete('/inventory/category/:id', deleteInventoryCat);


export default inventoryCatRoute