import * as bcrypt from "bcrypt";
import User, { UserRole } from "../entities/User.entity";
import { NotFoundException } from "../exceptions";

class UserService {
  async createUser(
    username: string,
    email: string,
    password: string,
    role: UserRole,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: role, // Set the role here
    }).save();
    return user;
  }

  async getUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  async comparePasswords(candidatePassword: string, hashedPassword: string) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  async getUsers() {
    //* SELECT * FROM users Works like this
    const users = await User.find();
    return users;
  }

  async getUserById(UserId: number) {
    const user = await User.findOne({
      where: {
        user_id: UserId,
      },
    });
    if (!user) {
      throw new NotFoundException("User not Found");
    }
    return user;
  }

  async updateUser(id: number, body: User) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException("User not Found");
    }
    User.merge(user, body);
    return user.save();
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException("User not Found");
    } else {
      return await user.remove();
    }
  }
}

export default new UserService();
