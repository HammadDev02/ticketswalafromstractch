import express from 'express';
import { createStopSchedule, readStopSchedule, updateStopSchedule, deleteStopSchedule } from '../controllers/stopsScheduleController.js';

const stopsScheduleRoute = express.Router();


stopsScheduleRoute.post('/stopsschedule', createStopSchedule)
stopsScheduleRoute.get('/stopsschedule', readStopSchedule)
stopsScheduleRoute.get('/stopsschedule/:id', readStopSchedule)
stopsScheduleRoute.put('/stopsschedule/:id', updateStopSchedule)
stopsScheduleRoute.delete('/stopsschedule/:id', deleteStopSchedule)



export default stopsScheduleRoute