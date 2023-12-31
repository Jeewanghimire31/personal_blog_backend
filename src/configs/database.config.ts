import { DataSource } from "typeorm";
import { Blog } from "../entities/Blog";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: +process.env.DATABASE_PORT!,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: [Blog],
  subscribers: [],
  migrations: [],
});
