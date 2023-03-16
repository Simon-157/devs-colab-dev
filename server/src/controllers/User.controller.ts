import { Response, Request } from "express";
import User from "../models/users";
import { UserInterface } from "../types/user";

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password }: { username: string; email: string; password: string } = req.body;

    const user: UserInterface = await User.create({
      username,
      email,
      password_hash: password,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user: UserInterface | null = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export { createUser, getUser };
