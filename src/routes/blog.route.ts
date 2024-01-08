import { Router } from "express";
import { getBlogs, insertBlog } from "../controllers/blog.controller";

const router = Router();

router.get("/", getBlogs);

router.post("/", insertBlog);

export default router;
