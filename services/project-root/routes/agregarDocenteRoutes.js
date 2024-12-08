import express from "express";
import {getCargos, postEmpleado} from "../controllers/agregarDocenteControllers.js";

const router = express.Router();

router.get("/cargos-d", getCargos);
router.post("/insert-empleado", postEmpleado);

export default router;