import express from 'express';
import { getNotasTareasAlumnos } from '../controllers/reporteController.js';

const router = express.Router();

router.get('/reporte-alumnos/notas-tareas', getNotasTareasAlumnos);

export default router;