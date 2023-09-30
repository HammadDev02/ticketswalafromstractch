import express from "express";
import { registerCompany, getAllCompanies, deleteCompany, updateCompany } from '../controllers/companyController.js'
import multer from "multer";
const companyRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Company Routes
companyRoute.post('/company/', upload.single('logo'), registerCompany);
companyRoute.get('/company/:id', getAllCompanies);
companyRoute.get('/company/', getAllCompanies);
companyRoute.delete('/company/:id', deleteCompany);
companyRoute.put('/company/:id', updateCompany);




export default companyRoute