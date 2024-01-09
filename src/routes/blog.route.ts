import { Router } from "express";
import {
  deleteBlog,
  getBlogById,
  getBlogs,
  postBlog,
  updateTodo,
} from "../controllers/blog.controller";

const router = Router();

router.get("/", getBlogs);

router.get("/:id", getBlogById);

router.post("/", postBlog);

router.put("/:id", updateTodo);

router.delete("/:id", deleteBlog)

export default router;
