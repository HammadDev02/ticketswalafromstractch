import express from 'express';
import { createBusRouteStop, readBusRoutesStop, updateBusRoutesStop, deleteBusRoutesStop } from '../controllers/routeOfBusStopController.js';

const routesOfBusRouteStop = express.Router();


routesOfBusRouteStop.post('/busroutesstop', createBusRouteStop)
routesOfBusRouteStop.get('/busroutesstop', readBusRoutesStop)
routesOfBusRouteStop.get('/busroutesstop/:id', readBusRoutesStop)
routesOfBusRouteStop.put('/busroutesstop/:id', updateBusRoutesStop)
routesOfBusRouteStop.delete('/busroutesstop/:id', deleteBusRoutesStop)



export default routesOfBusRouteStop