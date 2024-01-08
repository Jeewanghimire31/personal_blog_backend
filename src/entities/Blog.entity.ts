import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Comment from "./Comment.entity";
import User from "./User.entity";

@Entity()
export default class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
    blog_id: number;

  @Column()
    title: string;

  @Column("text")
    content: string;

  @ManyToOne(() => User, (user) => user.blogs)
    author: User;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;

  @OneToMany(() => Comment, (comment) => comment.blog)
    comments: Comment[];
}
