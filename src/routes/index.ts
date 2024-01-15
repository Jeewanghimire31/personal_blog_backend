import { Application } from "express";
import blogRoute from "./blog.route";
import commentRoute from "./comment.route";
import mediaRoute from "./media.route";
import pingRoute from "./ping.route";
import userRoute from "./user.route";

const initializeRoutes = (app: Application) => {
  app.use("/ping", pingRoute);
  app.use("/blogs", blogRoute);
  app.use("/user", userRoute);
  app.use("/media", mediaRoute);
  app.use("/comments", commentRoute);
};

export default initializeRoutes;
