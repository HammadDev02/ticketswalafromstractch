import express from 'express';
import { createSchedule, readSchedule, updateSchedule, deleteSchedule } from '../controllers/scheduleController.js';

const scheduleRoute = express.Router();


scheduleRoute.post('/schedule', createSchedule)
scheduleRoute.get('/schedule', readSchedule)
scheduleRoute.get('/schedule/:id', readSchedule)
scheduleRoute.put('/schedule/:id', updateSchedule)
scheduleRoute.delete('/schedule/:id', deleteSchedule)



export default scheduleRoute