import express from 'express';
import {createBusRoute, readBusRoutes, updateBusRoutes, deleteBusRoutes} from '../controllers/routeOfBusController.js';

const routesOfBus = express.Router();

routesOfBus.post('/busroutes', createBusRoute)
routesOfBus.get('/busroutes', readBusRoutes)
routesOfBus.get('/busroutes/:id', readBusRoutes)
routesOfBus.put('/busroutes/:id', updateBusRoutes)
routesOfBus.delete('/busroutes/:id', deleteBusRoutes)

export default routesOfBus 