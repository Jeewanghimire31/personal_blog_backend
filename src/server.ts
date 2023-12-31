import { config } from "dotenv";
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./configs/database.config";
import { initializeRoutes } from "./routes";
// Load environment variables
config();

const app = express();

initializeRoutes(app);

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
