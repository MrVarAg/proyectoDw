import express from 'express';
import { getAulas, postAgregarDiaClase, getClaseCreada, getDias } from '../controllers/agregarDiaClaseController.js';

const router = express.Router();

router.get('/aulas', getAulas);
router.get('/clase-creada', getClaseCreada);
router.post('/agregar-dia-clase', postAgregarDiaClase);
router.get('/dias', getDias);

export default router;

