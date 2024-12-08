import express from 'express';
import { postCarrera } from '../controllers/agregarCarreraController.js';

const router = express.Router();

router.post('/insert-carrera', postCarrera);

export default router;