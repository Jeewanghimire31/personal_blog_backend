import { Application } from "express";
import blogRoute from "./blog.route";
import pingRoute from "./ping.route";

export const initializeRoutes = (app: Application) => {
  app.use("/ping", pingRoute);
  app.use("/blogs", blogRoute);
};
