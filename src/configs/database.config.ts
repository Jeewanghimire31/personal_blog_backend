import { DataSource, DataSourceOptions } from "typeorm";
import serverConfig from "../config";
import Blog from "../entities/Blog.entity";
import Comment from "../entities/Comment.entity";
import { Media } from "../entities/Media.entity";
import User from "../entities/User.entity";

const { database } = serverConfig;
const { type, host, port, user, password, database: databaseName } = database;

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database

export const AppDataSource = new DataSource({
  type,
  host,
  port,
  username: user,
  password,
  database: databaseName,
  synchronize: true,
  logging: false,
  entities: [Blog, User, Comment, Media],
  subscribers: [],
  migrations: [],
} as DataSourceOptions);

export default AppDataSource;
