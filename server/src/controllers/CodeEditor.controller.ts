import { Request, Response } from "express";
import { pool } from "../config/pg";



const createCodeEditor = async (req: Request, res: Response) => {
  try {
    const { group_id, problem_id } = req.body;

    const query = "INSERT INTO code_editor (group_id, practice_problem_id) VALUES ($1, $2) RETURNING *";
    const values = [group_id, problem_id];

    const { rows } = await pool.query(query, values);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCodeEditor = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const { codeEditorId } = req.params;

    const query = "SELECT * FROM code_editor WHERE id = $1";
    const values = [codeEditorId];

    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Code editor not found" });
    }

    const updatedCodeEditor = { ...rows[0], code };

    const updateQuery =
      "UPDATE code_editor SET content = $1 WHERE id = $2 RETURNING *";
    const updateValues = [updatedCodeEditor.code, codeEditorId];

    const { rows: updatedRows } = await pool.query(updateQuery, updateValues);

    res.status(200).json(updatedRows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export { createCodeEditor, updateCodeEditor };
