import { Router } from "express";
import { createProblem, getProblemById } from "../controllers/Problem.controller";

export const router = Router();

router.post('/', createProblem);
router.get('/:problemId', getProblemById);

