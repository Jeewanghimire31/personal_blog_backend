import { NextFunction, Request, Response } from "express";
import blogService from "../services/blog.service";

export const getBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await blogService.getBlogs();
    res.send({
      success: true,
      message: "Blogs fetched successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const getBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const data = await blogService.getBlogById(Number(id));
    res.send({
      success: true,
      message: `Blog of id:${id} fetched successfully`,
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const postBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, content } = req.body;
  // console.log(body);
  try {
    const response = await blogService.postBlog({ title, content });
    res.send({
      success: true,
      message: "Blog created successfully",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { body } = req;
  try {
    // console.log(body);
    const response = await blogService.updateBlog(Number(id), body);
    res.send({
      success: true,
      message: `Blog of id: ${id} updated successfully`,
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const data = await blogService.deleteBlog(Number(id));
    res.send({
      success: true,
      message: `Blog of id: ${id} deleted successfully`,
      data,
    });
  } catch (err) {
    next(err);
  }
};
