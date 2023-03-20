import { Router } from "express";
import { createProblem, getProblemById, getProblems } from "../controllers/Problem.controller";

const router = Router();

router.post('/', createProblem);
router.get('/challenges/:problemId', getProblemById);
router.get('/allproblems', getProblems)

export {router};