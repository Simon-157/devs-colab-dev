import { Response, Request } from "express";
import { pool } from "../config/pg";
import { UserInterface } from "../types/user";

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password }: { username: string; email: string; password: string } = req.body;

    const query = `INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *`;
    const values = [username, email, password];

    const { rows } = await pool.query<UserInterface>(query, values);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const query = `SELECT * FROM users WHERE id = $1`;
    const values = [id];

    const { rows } = await pool.query<UserInterface>(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export { createUser, getUser };
