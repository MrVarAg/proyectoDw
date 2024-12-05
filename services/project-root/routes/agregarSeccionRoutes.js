import express from 'express';
import { postAgregarSeccion } from '../controllers/agregarSeccionController.js';
const router = express.Router();

router.post('/agregar-seccion', postAgregarSeccion);
export default router;