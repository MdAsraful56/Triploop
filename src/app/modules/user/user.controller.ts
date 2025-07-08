import { Request, Response } from "express";
import { User } from "./user.model";

const createUser = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const { name, email } = req.body;
    const user = await User.create({
      name,
      email,
    });
    res.status(201).json({
      message: "User created Successful",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: `Something went Wrong ${error}`,
      error,
    });
  }
};

export const UserControllers = {
  createUser,
};
