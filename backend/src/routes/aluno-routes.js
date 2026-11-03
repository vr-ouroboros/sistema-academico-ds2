import AlunoController from "../controller/aluno-controller.js";
import express from "express";

const router = express.Router();

router.get("/", AlunoController.listar);
router.post("/", AlunoController.cadastrar);

export default router;