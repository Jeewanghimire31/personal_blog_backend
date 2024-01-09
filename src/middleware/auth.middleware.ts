import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/auth";
import User from "../entities/User.entity";
import { ForbiddenException } from "../exceptions/forbidden.exception";

// Extend the Request type to include the user property
interface AuthenticatedRequest extends Request {
    user?: User;
  }

export const authenticateUser = (requiredRole: string) => (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - Access token missing" });
  }

  try {
    const user = verifyAccessToken(token);
    console.log(user);
    // Check if the user's role matches the required role
    if (user.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: "Forbidden - Insufficient permissions",
        });
    //    throw new ForbiddenException("Forbidden - UnAuthorized permissions");
      }

    req.user = user; //if user credentials need back again
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - Invalid access token" });
  }


};
