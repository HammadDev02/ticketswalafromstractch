import express from 'express';
import { postUsers, getUsers, updateUser, deleteUser } from '../controllers/usersControllers.js'
const usersRoute = express.Router();


usersRoute.post('/users', postUsers)
usersRoute.get('/users', getUsers)
usersRoute.get('/users/:id', getUsers)
usersRoute.put('/users/:id', updateUser)
usersRoute.delete('/users/:id', deleteUser)


export default usersRoute