import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  const existingUser = await UserService.getUserByEmail(email);
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }
  const user = await UserService.createUser(username, email, password, role);

  res.json({ success: true, message: "User created successfully", user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserService.getUserByEmail(email);
  if (!user || !(await UserService.comparePasswords(password, user.password))) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({
    success: true,
    message: "Login successful",
    accessToken,
    refreshToken,
    role: user.role,
  });
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await UserService.getUsers();
    res.send({
      success: true,
      message: "Users fetched successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const data = await UserService.getUserById(Number(id));
    res.send({
      success: true,
      message: `User of id:${id} fetched successfully`,
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { body } = req;
  try {
    // console.log(body);
    const response = await UserService.updateUser(Number(id), body);
    res.send({
      success: true,
      message: `User of id: ${id} updated successfully`,
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const data = await UserService.deleteUser(Number(id));
    res.send({
      success: true,
      message: `User of id: ${id} deleted successfully`,
      data,
    });
  } catch (err) {
    next(err);
  }
};
