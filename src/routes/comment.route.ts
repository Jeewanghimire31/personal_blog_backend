import { NextFunction, Request, Response, Router } from "express";
import Comment from "../entities/Comment.entity";
import { authenticateUser } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  authenticateUser("logged_in_user"),
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.blogId && !req.body.content) {
      return res.status(422).json({
        message: "Missing blogId or content",
      });
    }
    const comment = await Comment.create({
      blog: req.body.blogId,
      content: req.body.content,
      //@ts-ignore
      user: req.user.userId,
    }).save();

    return res.json({
      message: "Commented in blog successfully",
      data: comment,
    });
  },
);

export default router;
