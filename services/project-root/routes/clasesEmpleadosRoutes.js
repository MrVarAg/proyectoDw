import express from 'express';
import { getClasesEmpleados } from '../controllers/reporteController.js';

const router = express.Router();

router.get('/reporte-empleados/clases', getClasesEmpleados);

export default router;