import express from 'express';
import { getAsistenciaEmpleados } from '../controllers/reporteController.js';

const router = express.Router();

router.get('/reporte-empleados/asistencia', getAsistenciaEmpleados);

export default router;
