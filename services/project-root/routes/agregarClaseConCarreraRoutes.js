import express from 'express';

import { postClaseCarrera } from '../controllers/agregarClaseConCarreraControllers.js';

const router = express.Router();

router.post('/insert-clase-carrera', postClaseCarrera);

export default router;