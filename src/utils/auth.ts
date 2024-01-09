import jwt from "jsonwebtoken";
import User from '../entities/User.entity';

const JWT_SECRET = "Jeewan_key";
export const generateAccessToken = (user: User): string => {
  const payload = { userId: user.user_id, username: user.username, role:user.role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "111s" }); // Adjust the expiration time as needed
};

export const generateRefreshToken = (user: User): string => {
  const payload = { userId: user.user_id, username: user.username, role:user.role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "200s" }); // Adjust the expiration time as needed
};

export const verifyAccessToken = (token: string): User => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as User;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const verifyRefreshToken = (token: string): User => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as User;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
