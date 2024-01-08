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

export const getBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await blogService.getBlogById(Number(id));
  res.send({
    success: true,
    message: "Todos fetched successfully",
    data,
  });
};

export const postBlog = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  // console.log(body);
  const response = await blogService.postTodo({ title, content });
  res.send({
    success: true,
    message: "Blog created successfully",
    data: response,
  });
};
