import { Router } from "express";
import {
  deleteBlog,
  getBlogById,
  getBlogs,
  postBlog,
  updateBlog,
} from "../controllers/blog.controller";

const router = Router();

router.get("/", getBlogs);

router.get("/:id", getBlogById);

router.post("/", postBlog);

router.put("/:id", updateBlog);

router.delete("/:id", deleteBlog)

export default router;
