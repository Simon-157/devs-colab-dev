import { Request, Response } from "express";
async function getGroupMembers(req:Request, res:Response) {
  try {
    const { group_id } = req.params;

    const groupMembers = await GroupMember.findAll({
      where: {
        group_id,
      },
    });

    res.status(200).json(groupMembers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getGroupMembers,
};
