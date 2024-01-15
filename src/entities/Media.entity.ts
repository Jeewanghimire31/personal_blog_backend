import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Blog from "./Blog.entity";

export enum MediaType {
  Banner = "banner",
  Thumbnail = "thumbnail",
}

@Entity()
export class Media extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: MediaType,
  })
  type: MediaType;

  @ManyToOne(() => Blog, (blog) => blog.media)
  blog: Blog;

  @CreateDateColumn()
  createdAt: Date;

  path: string;

  @AfterLoad()
  getPath() {
    this.path = `${process.env.BASE_URL}${this.name}`;
  }
}
