import { Router, Response, Request } from "express";
import PracticeProblem from "../models/problem";


const createProblem = async (req: Request, res: Response) => {
  try {
    const { title, description, solution } = req.body;

    const practiceProblem = await PracticeProblem.create({
      title,
      description,
      solution,
    });

    res.status(201).json(practiceProblem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

const getProblemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const practiceProblem = await PracticeProblem.findByPk(id);

    if (!practiceProblem) {
      return res.status(404).json({ message: "Practice problem not found" });
    }

    res.status(200).json(practiceProblem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export { createProblem, getProblemById };
