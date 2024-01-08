import { Application } from "express";
import blogRoute from "./blog.route";
import pingRoute from "./ping.route";

const initializeRoutes = (app: Application) => {
  app.use("/ping", pingRoute);
  app.use("/blogs", blogRoute);
};

export default initializeRoutes;
