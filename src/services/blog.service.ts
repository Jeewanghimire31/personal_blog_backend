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
  async insert(body: BlogBody) {
    // Insert into blog(title,content) values(body.title,body.content)
    await Blog.create({
      content: body.content,
      title: body.title,
    }).save();
  }
}

export default new BlogService();
