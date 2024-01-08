import { Router } from "express";
import { getBlogs, getBlogById, postBlog } from "../controllers/blog.controller";

const router = Router();

router.get("/", getBlogs);

router.get("/:id", getBlogById);

router.post("/", postBlog);

export default router;
