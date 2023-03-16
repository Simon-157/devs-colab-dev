import { Request, Response } from "express";
import Group from "../models/group";
import GroupMember from "../models/groupMember";

const createGroup = async (req: Request, res: Response)  =>{
  try {
    const { name } = req.body;

    const group = await Group.create({
      name,
    });

    const { user_id } = req.params; // Assuming you have an authentication middleware that sets the user ID on the request object

    await GroupMember.create({
      group_id: group.id,
      user_id,
    });

    res.status(201).json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

const joinGroup = async (req: Request, res: Response)  => {
  try {
    const { group_id } = req.params;
    const { user_id } = req.params; // Assuming there is an authentication middleware that sets the user ID on the request object

    const group = await Group.findByPk(group_id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    await GroupMember.create({
      group_id,
      user_id,
    });

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

    const group = await Group.findByPk(group_id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    await GroupMember.destroy({
      where: {
        group_id,
        user_id,
      },
    });

    res.status(200).json({ message: "User left group" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export { createGroup, joinGroup, leaveGroup };
