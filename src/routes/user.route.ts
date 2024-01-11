import { Router } from "express";
import {
    deleteUser,
  getUserById,
  getUsers,
  login,
  signup,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
