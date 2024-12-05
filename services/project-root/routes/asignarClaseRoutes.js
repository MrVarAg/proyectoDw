import express from 'express';
import { getClases, getPeriodos, getSecciones, postAsignarClase} from '../controllers/agregarClaseController.js';

const router = express.Router();

router.get('/clases', getClases);
router.get('/periodos', getPeriodos);
router.get('/secciones', getSecciones);
router.post('/asignar-clase', postAsignarClase);

export default router;