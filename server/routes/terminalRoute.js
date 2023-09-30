import express from 'express';
import {postTerminal, getTerminal, updateTerminal, deleteTerminal} from '../controllers/terminalControllers.js'
const terminalRoute = express.Router();


terminalRoute.post('/terminal', postTerminal)
terminalRoute.get('/terminal', getTerminal)
terminalRoute.get('/terminal/:id', getTerminal)
terminalRoute.put('/terminal/:id', updateTerminal)
terminalRoute.delete('/terminal/:id', deleteTerminal)


export default terminalRoute