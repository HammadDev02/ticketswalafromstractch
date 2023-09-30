import getUser from '../controllers/authController.js'
import express from 'express';

const authRoute = express.Router();

authRoute.get('/auth/register', getUser)

export default authRoute 