import { Blog } from "../entities/Blog";

class BlogService {
  constructor() {}

  async mockCreate() {
    return await Blog.create({
      title: "Hello World",
      content: "Test Test",
    }).save();
  }

  async getBlogs() {
    return await Blog.find();
  }
}

export default new BlogService();
