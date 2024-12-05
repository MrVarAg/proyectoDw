import express from 'express';
import { getAsistenciaAlumnos } from '../controllers/reporteController.js';

const router = express.Router();

router.get('/reporte-alumnos/asistencia', getAsistenciaAlumnos);

export default router;
