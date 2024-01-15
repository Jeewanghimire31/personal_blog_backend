import { ILike, In } from "typeorm";
import Blog from "../entities/Blog.entity";
import { Media } from "../entities/Media.entity";
import { NotFoundException } from "../exceptions";

interface BlogBody {
  id: number;
  title: string;
  content: string;
}

class BlogService {
  async getBlogs(query: string | undefined) {
    //* SELECT * FROM Blogs Works like this
    const blogs = await Blog.find({
      relations: ["media", "comments", "comments.user"],
      where: {
        title: query ? ILike(`%${query}%`) : undefined,
      },
    });
    return blogs;
  }

  async getBlogById(blogId: number) {
    // If id undefined=>firstRow
    const blog = await Blog.findOne({
      where: {
        blog_id: blogId,
      },
      relations: ["media", "comments"],
    });
    if (!blog) {
      throw new NotFoundException("Blog not Found");
    }
    return blog;
  }

  async postBlog(body: any) {
    let media: Media[] = [];
    if (body.media) {
      media = await Media.find({
        where: {
          id: In(body.media),
        },
      });
    }
    //* Insert into blog(title,content) values(body.title,body.content) works like this.
    await Blog.create({
      title: body.title,
      content: body.content,
      media,
    }).save();
  }

  async updateBlog(id: number, body: BlogBody) {
    const blog = await this.getBlogById(id);
    // if (!blog) {
    //   throw new NotFoundException("Blog not Found");
    // }
    // console.log("hello", blog, body);
    // blog.title = body.title;
    // blog.content = body.content;
    // Object.assign(blog, body)
    Blog.merge(blog, body);
    // Save the updated blog
    return blog.save();
  }

  // eslint-disable-next-line class-methods-use-this
  async deleteBlog(id: number) {
    const blog = await this.getBlogById(id);
    if (!blog) {
      throw new NotFoundException("Blog not Found");
    } else {
      return await blog.remove();
    }
  }

  async getTotalCount() {
    return await Blog.count();
  }
}

export default new BlogService();
