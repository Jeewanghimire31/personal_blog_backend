import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Blog from "./Blog.entity";
import Comment from "./Comment.entity";

export enum UserRole {
  ADMIN = "admin",
  LOGGED_IN_USER = "logged_in_user",
}

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.LOGGED_IN_USER,
  })
  role: UserRole;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
