import express from 'express';
import { postAlumno, getCarreras } from '../controllers/agregarAlumnoControllers.js';

const router = express.Router();

router.get('/carreras-a', getCarreras);
router.post('/agregar-alumno-a', postAlumno);

export default router;
