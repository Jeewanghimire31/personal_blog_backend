import { Request, Response } from "express";
import blogService from "../services/blog.service";

export const getBlogs = async (req: Request, res: Response) => {
  const data = await blogService.getBlogs();
  res.send({
    success: true,
    message: "Blogs fetched successfully",
    data,
  });
};

export const insertBlog = async (req: Request, res: Response) => {
  const { body } = req.body;
  // console.log(body);
  const response = await blogService.insert(body);
  res.send({
    success: true,
    message: "Blog created successfully",
    data: response,
  });
};
