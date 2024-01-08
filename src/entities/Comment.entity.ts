// comment.entity.ts
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Blog from "./Blog.entity";
import User from "./User.entity";

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
    comment_id: number;

  @ManyToOne(() => Blog, (blog) => blog.comments)
    blog: Blog;

  @ManyToOne(() => User, (user) => user.comments)
    user: User;

  @Column("text")
    content: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}
