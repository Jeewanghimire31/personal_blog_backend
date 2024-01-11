import Blog from "../entities/Blog.entity";
import { NotFoundException } from "../exceptions";

interface BlogBody {
  id: number;
  title: string;
  content: string;
}

class BlogService {
  async getBlogs() {
    //* SELECT * FROM Blogs Works like this 
    const blogs = await Blog.find();
    return blogs;
  }

  async getBlogById(blogId: number) {
    // If id undefined=>firstRow
    const blog = await Blog.findOne({
      where: {
        blog_id: blogId,
      },
    });
    if (!blog) {
      throw new NotFoundException("Blog not Found");
    }
    return blog;
  }

  async postBlog(body: any) {
    //* Insert into blog(title,content) values(body.title,body.content) works like this.
    await Blog.create({
      title: body.title,
      content: body.content,
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
}

export default new BlogService();
