import express from 'express';
import { updateNumCuenta, getClaseCreada, getDocentes } from '../controllers/agregarDocenteClaseController.js';
const router = express.Router();

router.post('/update-num-cuenta', updateNumCuenta);
router.get('/get-clase-creada1', getClaseCreada);
router.get('/get-docentes1', getDocentes);

export default router;
