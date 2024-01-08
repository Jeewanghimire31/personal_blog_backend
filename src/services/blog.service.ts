import Blog from "../entities/Blog.entity";

interface BlogBody {
  title: string;
  content: string;
}

class BlogService {
  // eslint-disable-next-line class-methods-use-this
  async getBlogs() {
    // SELECT * FROM Blogs
    const blogs = await Blog.find();
    return blogs;
  }

  // eslint-disable-next-line class-methods-use-this
  async getBlogById(blogId: number) {
    // If id undefined=>firstRow
    const blog = await Blog.findOne({
      where: {
        blog_id: blogId,
      },
    });
    return blog;
  }

  // eslint-disable-next-line class-methods-use-this
  async postTodo(body: BlogBody) {
    // Insert into blog(title,content) values(body.title,body.content)
    await Blog.create({
      title: body.title,
      content: body.content,
    }).save();
  }
}

export default new BlogService();
