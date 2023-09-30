import express from 'express';
import { postDriver, getDrivers, updateDriver, deleteDriver} from '../controllers/driverController.js'
const driverRoute = express.Router();


driverRoute.post('/driver', postDriver)
driverRoute.get('/driver/', getDrivers)
driverRoute.get('/driver/:id', getDrivers)
driverRoute.put('/driver/:id', updateDriver)
driverRoute.delete('/driver/:id', deleteDriver)


export default driverRoute