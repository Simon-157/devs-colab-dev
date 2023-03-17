import { Request, Response } from "express";
import { pool } from "../config/pg";


const getGroupMembers = async (req: Request, res: Response) => {
  try {
    const { group_id } = req.params;

    const result = await pool.query(
      `SELECT * FROM group_members WHERE group_id = $1`,
      [group_id]
    );
    
    const groupMembers = result.rows;
    res.status(200).json(groupMembers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export { getGroupMembers };
