import express from "express";
import {postAula} from "../controllers/agregarAulaControllers.js";

const router = express.Router();

router.post("/agregar-aula", postAula);

export default router;
