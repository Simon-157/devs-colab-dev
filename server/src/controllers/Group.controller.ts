import { Request, Response } from "express";
import { pool } from "../config/pg";

const createGroup = async (req: Request, res: Response)  =>{
  try {
    const { name } = req.body;

    const group = await pool.query(
      `INSERT INTO "Group" (name) VALUES ($1) RETURNING *`,
      [name]
    );

    const { user_id } = req.params; // Assuming you have an authentication middleware that sets the user ID on the request object

    await pool.query(
      `INSERT INTO "GroupMember" (group_id, user_id) VALUES ($1, $2)`,
      [group.rows[0].id, user_id]
    );

    res.status(201).json(group.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

const joinGroup = async (req: Request, res: Response)  => {
  try {
    const { group_id } = req.params;
    const { user_id } = req.params; // Assuming there is an authentication middleware that sets the user ID on the request object

    const group = await pool.query(
      `SELECT * FROM "Group" WHERE id = $1`,
      [group_id]
    );

    if (!group.rows.length) {
      return res.status(404).json({ message: "Group not found" });
    }

    await pool.query(
      `INSERT INTO "GroupMember" (group_id, user_id) VALUES ($1, $2)`,
      [group_id, user_id]
    );

    res.status(200).json({ message: "User joined group" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

const leaveGroup = async (req: Request, res: Response) =>{
  try {
    const { group_id } = req.params;
    const { user_id } = req.params; // Assuming there is  an authentication middleware that sets the user ID on the request object

    const group = await pool.query(
      `SELECT * FROM "Group" WHERE id = $1`,
      [group_id]
    );

    if (!group.rows.length) {
      return res.status(404).json({ message: "Group not found" });
    }

    await pool.query(
      `DELETE FROM "GroupMember" WHERE group_id = $1 AND user_id = $2`,
      [group_id, user_id]
    );

    res.status(200).json({ message: "User left group" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export { createGroup, joinGroup, leaveGroup };
