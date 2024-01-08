import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Welcome to Blog API V0.0.1",
  });
});

export default router;
