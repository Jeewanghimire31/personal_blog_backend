import cors from "cors";
import express from "express";
import "reflect-metadata";
import AppDataSource from "./configs/database.config";
import { errorHandlerMiddleware } from "./middleware/errorHandler.middleware";
import initializeRoutes from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

initializeRoutes(app);

app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, async () => {
  try {
    await AppDataSource.initialize();
    if (AppDataSource.isInitialized) {
      console.log(`Server is running: http://localhost:${process.env.PORT}`);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
});
