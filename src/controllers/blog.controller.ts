import { NextFunction, Request, Response } from "express";
import blogService from "../services/blog.service";

export const getBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await blogService.mockCreate();
  const data = await blogService.getBlogs();
  res.send({
    success: true,
    message: "Blogs fetched successfully",
    data,
  });
  
};
