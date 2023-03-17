import { Response, Request } from "express";
import { pool } from "../config/pg";


const createProblem = async (req: Request, res: Response) => {
  try {
    const { title, description, solution } = req.body;

    const result = await pool.query(
      "INSERT INTO practice_problems (title, description, solution) VALUES ($1, $2, $3) RETURNING *",
      [title, description, solution]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getProblemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM practice_problems WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Practice problem not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export { createProblem, getProblemById };
