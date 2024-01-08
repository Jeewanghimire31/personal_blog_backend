// user.entity.ts
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import Blog from "./Blog.entity";
import Comment from "./Comment.entity";

@Entity()
@Unique(["username"])
// @Unique(["email"])
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    user_id: number;

  @Column()
    username: string;

  // @Column()
  //   email: string;

  @Column()
    password: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;

  @OneToMany(() => Blog, (blog) => blog.author)
    blogs: Blog[];

  @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
}
